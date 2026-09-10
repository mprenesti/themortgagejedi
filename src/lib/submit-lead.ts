export type LeadInput = {
  // Provide either a single full `name` (it will be split) or explicit
  // firstName/lastName.
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  formSource: string;
};

/**
 * Posts a lead to the server-side /api/lead route, which forwards it to
 * GoHighLevel. Returns true only when the server confirms success. Never
 * throws — callers can rely on the boolean to drive success/error UI.
 */
export async function submitLead(input: LeadInput): Promise<boolean> {
  let firstName = input.firstName;
  let lastName = input.lastName;

  if (!firstName && !lastName && input.name) {
    const parts = input.name.trim().split(/\s+/);
    firstName = parts.shift() ?? "";
    lastName = parts.join(" ");
  }

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email: input.email,
        phone: input.phone,
        message: input.message,
        formSource: input.formSource,
      }),
    });
    const json = (await res.json().catch(() => null)) as {
      success?: boolean;
    } | null;
    return res.ok && json?.success === true;
  } catch {
    return false;
  }
}
