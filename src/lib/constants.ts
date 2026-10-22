export const SITE = {
  name: "The Mortgage Jedi",
  fullName: "Mike Prenesti | The Mortgage Jedi",
  tagline: "Your Mortgage, Made Simple. Your Future, Made Possible.",
  nmls: "NMLS #1033445",
  company: "C2 Financial Corporation",
  corporateNmls: "NMLS #135622",
  // Branch office address displayed across the site.
  branchAddress: "2320 Paseo Del Prado, Suite B204, Las Vegas, NV 89102",
  // Compliance licensing line shown in the footer and legal copy.
  licenseLine: "C2 NMLS #135622 | C2 NV #3260 | NMLS #1033445",
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
    "https://maps.app.goo.gl/pc8in2CWfhiqHcZU7",
  nmlsConsumerAccess: "https://www.nmlsconsumeraccess.org/",
} as const;

export const PHONE_HREF = `tel:+1${SITE.phone.replace(/\D/g, "")}`;
export const SMS_HREF = `sms:+1${SITE.phone.replace(/\D/g, "")}`;
export const PHONE_DISPLAY = "(702) 497-0584";
export const EMAIL_HREF = `mailto:${SITE.email}`;
