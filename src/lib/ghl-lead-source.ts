// Server-side helpers for attaching lead-source data to GoHighLevel contacts.
//
// The human-readable values always land on the contact via a note (below), so
// nothing is lost even if a custom field is ever removed. The values are also
// mapped to structured custom fields for reporting.
//
// GHL custom field IDs:
//   FIELD_HOW_HEARD      -> "How did you hear about me?"
//   FIELD_WHAT_SEARCHED  -> "What did you search or ask?"
// The auto-detected source is optional and only mapped when its env var is set:
//   GHL_FIELD_LEAD_SOURCE_AUTO -> "Lead Source Auto (Detected)"

const FIELD_HOW_HEARD = "dMfUEqBkhFKmDyDLx1Rr";
const FIELD_WHAT_SEARCHED = "YQTbZqyI7tmtGhXq3rcF";

export type LeadSourceData = {
  leadSource?: string;
  leadSourceDetail?: string;
  leadSourceAuto?: string;
};

type CustomField = { id: string; field_value: string };

export function leadSourceCustomFields(data: LeadSourceData): CustomField[] {
  const fields: CustomField[] = [];

  if (data.leadSource) {
    fields.push({ id: FIELD_HOW_HEARD, field_value: data.leadSource });
  }
  if (data.leadSourceDetail) {
    fields.push({ id: FIELD_WHAT_SEARCHED, field_value: data.leadSourceDetail });
  }

  const idAuto = process.env.GHL_FIELD_LEAD_SOURCE_AUTO;
  if (idAuto && data.leadSourceAuto) {
    fields.push({ id: idAuto, field_value: data.leadSourceAuto });
  }
  return fields;
}

export function leadSourceNote(data: LeadSourceData): string {
  const lines = [
    `How did you hear about me: ${data.leadSource || "Not provided"}`,
  ];
  if (data.leadSourceDetail) {
    lines.push(`What did you search or ask: ${data.leadSourceDetail}`);
  }
  lines.push(`Detected source (auto): ${data.leadSourceAuto || "Not recorded"}`);
  return lines.join("\n");
}

export function leadSourceEmailHtml(data: LeadSourceData): string {
  return (
    `How did you hear about me: ${data.leadSource || "Not provided"}<br>` +
    (data.leadSourceDetail
      ? `What did you search or ask: ${data.leadSourceDetail}<br>`
      : "") +
    `Detected source (auto): ${data.leadSourceAuto || "Not recorded"}`
  );
}
