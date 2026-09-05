export const SITE = {
  name: "The Mortgage Jedi",
  fullName: "Mike Prenesti | The Mortgage Jedi",
  tagline: "Your Mortgage, Made Simple. Your Future, Made Possible.",
  nmls: "NMLS #1033445",
  company: "NEXA Mortgage, LLC",
  corporateNmls: "NMLS #1660690",
  // Corporate address NEXA loan officers display on their sites. Please confirm
  // this is the exact address NEXA instructs you to use before going live.
  corporateAddress: "3100 W Ray Rd, Ste 201, Office #209, Chandler, AZ 85226",
  // Optional: your branch/office address. Leave blank if not applicable.
  branchAddress: "",
  phone: "702-497-0584",
  phoneDirect: "702-291-9889",
  email: "mike@themortgagejedi.com",
  url: "https://themortgagejedi.com",
  bookingUrl:
    "https://go.themortgagejedi.com/widget/booking/oGfLuFAqGRAgEdPCB6R7",
  social: {
    instagram: "https://www.instagram.com/mikethemortgagejedi/",
    tiktok: "https://www.tiktok.com/@mikethemortgagejedi",
    youtube: "https://www.youtube.com/@mikethemortgagejedi",
    facebook: "https://www.facebook.com/profile.php?id=1730445206",
    linkedin: "https://linkedin.com/in/mikeprenesti",
  },
  googleReviewsUrl:
    "https://maps.app.goo.gl/pc8in2CWfhiqHcZU7",,
  nmlsConsumerAccess: "https://www.nmlsconsumeraccess.org/",
} as const;

export const PHONE_HREF = `tel:+1${SITE.phone.replace(/\D/g, "")}`;
export const PHONE_DISPLAY = "(702) 497-0584";
export const EMAIL_HREF = `mailto:${SITE.email}`;
