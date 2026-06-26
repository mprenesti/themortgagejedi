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
    instagram: "https://www.instagram.com/mikethemortgagejedi/",
    tiktok: "https://www.tiktok.com/@mikethemortgagejedi",
    youtube: "https://www.youtube.com/@mikethemortgagejedi",
    facebook: "https://www.facebook.com/profile.php?id=1730445206",
    linkedin: "https://linkedin.com/in/mikeprenesti",
  },
  googleReviewsUrl:
    "https://www.google.com/search?q=mike+prenesti+-+the+mortgage+jedi&rlz=1C1CHZN_enUS1157US1157&oq=mike&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIGCAEQRRg5MgoIAhAuGLEDGIAEMgoIAxAuGLEDGIAEMgYIBBBFGD0yBggFEEUYQTIGCAYQRRg9MgYIBxBFGD3SAQgxNTE2ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8",
  nmlsConsumerAccess: "https://www.nmlsconsumeraccess.org/",
} as const;

export const PHONE_HREF = `tel:+1${SITE.phone.replace(/\D/g, "")}`;
export const PHONE_DISPLAY = "(702) 497-0584";
export const EMAIL_HREF = `mailto:${SITE.email}`;
