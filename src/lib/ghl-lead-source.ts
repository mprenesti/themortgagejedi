// Server-side helpers for attaching lead-source data to GoHighLevel contacts.
//
// The human-readable values always land on the contact via a note (below), so
// nothing is lost even before the GHL custom fields exist. When the custom
// field IDs are provided as environment variables, the values are also mapped
// to structured custom fields for reporting.
//
// Create these custom fields in GHL and add their IDs as env vars:
//   GHL_FIELD_LEAD_SOURCE        -> custom field "Lead Source"
//   GHL_FIELD_LEAD_SOURCE_DETAIL -> custom field "Lead Source Detail"
//   GHL_FIELD_LEAD_SOURCE_AUTO   -> custom field "Lead Source Auto (Detected)"

export type LeadSourceData = {
  leadSource?: string;
  leadSourceDetail?: string;
  leadSourceAuto?: string;
};

type CustomField = { id: string; field_value: string };

export function leadSourceCustomFields(data: LeadSourceData): CustomField[] {
  const fields: CustomField[] = [];
  const idSource = process.env.GHL_FIELD_LEAD_SOURCE;
  const idDetail = process.env.GHL_FIELD_LEAD_SOURCE_DETAIL;
  const idAuto = process.env.GHL_FIELD_LEAD_SOURCE_AUTO;

  if (idSource && data.leadSource) {
    fields.push({ id: idSource, field_value: data.leadSource });
  }
  if (idDetail && data.leadSourceDetail) {
    fields.push({ id: idDetail, field_value: data.leadSourceDetail });
  }
  if (idAuto && data.leadSourceAuto) {
    fields.push({ id: idAuto, field_value: data.leadSourceAuto });
  }
  return fields;
}

export function leadSourceNote(data: LeadSourceData): string {
  const lines = [
    `How did you find me: ${data.leadSource || "Not provided"}`,
  ];
  if (data.leadSourceDetail) {
    lines.push(`Details: ${data.leadSourceDetail}`);
  }
  lines.push(`Detected source (auto): ${data.leadSourceAuto || "Not recorded"}`);
  return lines.join("\n");
}

export function leadSourceEmailHtml(data: LeadSourceData): string {
  return (
    `How did you find me: ${data.leadSource || "Not provided"}<br>` +
    (data.leadSourceDetail ? `Details: ${data.leadSourceDetail}<br>` : "") +
    `Detected source (auto): ${data.leadSourceAuto || "Not recorded"}`
  );
}
