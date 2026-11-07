import {
  CALCULATOR_GHL_FIELD_ENV,
  CALCULATOR_GHL_FIELD_KEYS,
  calculatorDisplayFields,
  type CalculatorEmailSnapshot,
  type CalculatorGhlFieldKey,
} from "./calculator-email";

const GHL_BASE = "https://services.leadconnectorhq.com";
const CACHE_TTL_MS = 10 * 60 * 1000;

export type GhlCustomField = { id: string; field_value: string };

type FieldIdCache = {
  expiresAt: number;
  ids: Map<string, string> | null;
};

let fieldIdCache: FieldIdCache | null = null;

export function resetCalculatorFieldIdCache() {
  fieldIdCache = null;
}

function normalizeFieldKey(key: string) {
  return key.trim().toLowerCase();
}

function indexCustomFields(
  fields: Array<{ id?: string; fieldKey?: string }>,
): Map<string, string> {
  const ids = new Map<string, string>();
  for (const field of fields) {
    if (!field.id || !field.fieldKey) continue;
    const key = normalizeFieldKey(field.fieldKey);
    ids.set(key, field.id);
    if (key.startsWith("contact.")) {
      ids.set(key.slice("contact.".length), field.id);
    } else {
      ids.set(`contact.${key}`, field.id);
    }
  }
  return ids;
}

async function lookupLocationFieldIds(
  locationId: string,
  headers: Record<string, string>,
  fetchFn: typeof fetch,
): Promise<Map<string, string> | null> {
  const now = Date.now();
  if (fieldIdCache && fieldIdCache.expiresAt > now) {
    return fieldIdCache.ids;
  }

  try {
    const url = `${GHL_BASE}/locations/${encodeURIComponent(locationId)}/customFields?model=contact`;
    const res = await fetchFn(url, {
      method: "GET",
      headers: { ...headers, Accept: "application/json" },
    });
    if (!res.ok) {
      console.warn(
        "[/api/calculator-email] GHL custom field lookup failed",
        res.status,
      );
      if (res.status === 401 || res.status === 403) {
        fieldIdCache = { expiresAt: now + CACHE_TTL_MS, ids: null };
      }
      return null;
    }
    const json = (await res.json().catch(() => null)) as {
      customFields?: Array<{ id?: string; fieldKey?: string }>;
      fields?: Array<{ id?: string; fieldKey?: string }>;
    } | null;
    const ids = indexCustomFields(json?.customFields ?? json?.fields ?? []);
    fieldIdCache = { expiresAt: now + CACHE_TTL_MS, ids };
    return ids;
  } catch {
    console.warn("[/api/calculator-email] GHL custom field lookup failed");
    return null;
  }
}

function envFieldId(key: CalculatorGhlFieldKey, env: NodeJS.ProcessEnv) {
  const name = CALCULATOR_GHL_FIELD_ENV[key];
  const value = env[name]?.trim();
  return value || undefined;
}

/**
 * Resolve calculator figures to GHL customFields. Never throws.
 * Prefers location field-key lookup; falls back to optional env IDs.
 */
export async function calculatorCustomFields(
  calc: CalculatorEmailSnapshot,
  options: {
    locationId: string;
    headers: Record<string, string>;
    env?: NodeJS.ProcessEnv;
    fetchFn?: typeof fetch;
  },
): Promise<GhlCustomField[]> {
  try {
    const env = options.env ?? process.env;
    const fetchFn = options.fetchFn ?? fetch;
    const values = calculatorDisplayFields(calc);
    const ids = await lookupLocationFieldIds(
      options.locationId,
      options.headers,
      fetchFn,
    );

    const fields: GhlCustomField[] = [];
    for (const key of CALCULATOR_GHL_FIELD_KEYS) {
      const lookupId = ids?.get(normalizeFieldKey(key));
      const id = lookupId || envFieldId(key, env);
      if (!id) {
        console.warn(
          "[/api/calculator-email] Skipping calculator custom field",
          key,
        );
        continue;
      }
      fields.push({ id, field_value: values[key] });
    }
    return fields;
  } catch {
    console.warn("[/api/calculator-email] Calculator custom fields skipped");
    return [];
  }
}
