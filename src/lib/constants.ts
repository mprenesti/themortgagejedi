export const SITE = {
  name: "The Mortgage Jedi",
  fullName: "Mike Prenesti | The Mortgage Jedi",
  tagline: "Your Mortgage, Made Simple. Your Future, Made Possible.",
  nmls: "NMLS #1033445",
  company: "C2 Financial Corporation",
  phone: "702-497-0584",
  phoneDirect: "702-291-9889",
  email: "mike@themortgagejedi.com",
  url: "https://themortgagejedi.com",
  bookingUrl:
    "https://go.themortgagejedi.com/widget/booking/oGfLuFAqGRAgEdPCB6R7",
  social: {
    instagram: "https://instagram.com/themortgagejedi",
    tiktok: "https://tiktok.com/@themortgagejedi",
    youtube: "https://youtube.com/@themortgagejedi",
    facebook: "https://facebook.com/themortgagejedi",
    linkedin: "https://linkedin.com/in/mikeprenesti",
  },
  googleReviewsUrl: "https://g.page/r/themortgagejedi",
  nmlsConsumerAccess: "https://www.nmlsconsumeraccess.org/",
} as const;

export const PHONE_HREF = `tel:+1${SITE.phone.replace(/\D/g, "")}`;
export const PHONE_DISPLAY = "(702) 497-0584";
export const EMAIL_HREF = `mailto:${SITE.email}`;
