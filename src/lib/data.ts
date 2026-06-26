export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Loan Options", href: "/loan-options" },
  {
    label: "Tools",
    href: "/tools/calculator",
    children: [
      { label: "Mortgage Calculator", href: "/tools/calculator" },
      { label: "Affordability Calculator", href: "/tools/affordability" },
      { label: "Rent vs Buy", href: "/tools/rent-vs-buy" },
      { label: "Pre-Approval Checklist", href: "/tools/checklist" },
    ],
  },
  {
    label: "Resources",
    href: "/resources/blog",
    children: [
      { label: "Blog", href: "/resources/blog" },
      {
        label: "First Time Buyer Guide",
        href: "/resources/first-time-buyer-guide",
      },
      { label: "FAQ", href: "/resources/faq" },
    ],
  },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export type Testimonial = {
  quote: string;
  name: string;
  date?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Mike kept me informed of all my options for the best possible financial situation in my home buying journey. It was a pleasure to work with him and his team.",
    name: "Tara Kleutsch",
    date: "2025",
  },
  {
    quote:
      "Mike was absolutely amazing to work with. He went above and beyond to help us understand the process and find the best loan for our situation.",
    name: "Jennifer R.",
    date: "2025",
  },
  {
    quote:
      "I would highly recommend Mike Prenesti to anyone looking to buy a home. He is professional, knowledgeable and truly cares about his clients.",
    name: "David M.",
    date: "2024",
  },
  {
    quote:
      "From start to finish Mike made the whole process painless. He explained every step and was always available when I had questions. Closed on time, no surprises.",
    name: "Samantha L.",
    date: "2024",
  },
  {
    quote:
      "As a self-employed business owner I thought getting a mortgage would be a nightmare. Mike found a bank statement program that fit perfectly. Couldn't be happier.",
    name: "Carlos V.",
    date: "2024",
  },
  {
    quote:
      "Mike refinanced my home and saved me hundreds a month. He laid out all the numbers clearly so I knew exactly what I was getting into. Honest and straightforward.",
    name: "Patricia H.",
    date: "2023",
  },
  {
    quote:
      "We were first time buyers and completely overwhelmed. Mike walked us through everything with patience and never made us feel rushed. Highly recommend.",
    name: "Brandon & Mia T.",
    date: "2023",
  },
  {
    quote:
      "Mike helped me finance my first investment property using a DSCR loan. He knew exactly which lenders to go to. The man knows his stuff.",
    name: "Anthony G.",
    date: "2023",
  },
  {
    quote:
      "Professional, responsive, and genuinely cares. Mike treated us like family, not a transaction. We'll use him for every home we ever buy.",
    name: "The Ramirez Family",
    date: "2022",
  },
];

export type FAQ = { q: string; a: string };

export const HOME_FAQS: FAQ[] = [
  {
    q: "What's the difference between a mortgage broker and a bank?",
    a: "A bank can only offer their own loan products. As a mortgage broker, I work with multiple lenders to find the best rate, terms, and loan program for your specific situation. Think of me as your personal loan shopper.",
  },
  {
    q: "Do I need perfect credit to get a loan?",
    a: "Not at all. There are loan programs available for credit scores as low as 500. I specialize in finding the right fit regardless of where your score is today — and I can help you build a plan to improve it over time.",
  },
  {
    q: "How long does the mortgage process take?",
    a: "Most loans close in 21 to 30 days from application. I keep you updated at every step so there are never any surprises.",
  },
  {
    q: "Can you help with investment property loans?",
    a: "Yes. I offer DSCR loans that qualify based on the property's rental income rather than your personal income. I also handle conventional investment loans, bank statement loans, and 1099 programs.",
  },
  {
    q: "What should I bring to my first consultation?",
    a: "Nothing. Our first conversation is casual and pressure free. I'll ask about your goals and situation, then guide you on what documentation we'll need when you're ready to move forward.",
  },
  {
    q: "Do you only work in Las Vegas?",
    a: "I'm licensed in Nevada and work with clients throughout the state. Most of my clients are in the Las Vegas and Henderson areas.",
  },
  {
    q: "How is your approach different from other loan officers?",
    a: "I don't lead with how much you qualify for. I lead with payment comfort. I ask what you want your monthly payment to be before we ever talk numbers. That one shift changes everything.",
  },
];

export type LoanProgram = {
  id: string;
  title: string;
  blurb: string;
  icon: string;
};

export const LOAN_SERVICES: LoanProgram[] = [
  {
    id: "purchase",
    title: "Purchase Loans",
    blurb: "FHA, VA, Conventional, Jumbo",
    icon: "Home",
  },
  {
    id: "investor",
    title: "Investor Financing",
    blurb: "DSCR, 1099, Bank Statement",
    icon: "Building2",
  },
  {
    id: "refinance",
    title: "Refinancing",
    blurb: "Rate reduction, cash out, debt consolidation",
    icon: "RefreshCw",
  },
  {
    id: "equity",
    title: "Home Equity",
    blurb: "HELOC, 2nd Mortgages",
    icon: "Landmark",
  },
  {
    id: "non-qm",
    title: "Self-Employed Loans",
    blurb: "Bank Statement, P&L, 1099",
    icon: "Briefcase",
  },
  {
    id: "specialty",
    title: "Specialty Loans",
    blurb: "New Construction, Land, Hard Money exits",
    icon: "Sparkles",
  },
];
