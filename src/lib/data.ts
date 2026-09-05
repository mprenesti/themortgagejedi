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
  { label: "Guides", href: "/guides" },
  { label: "Blog", href: "/resources/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/resources/faq" },
  { label: "Contact", href: "/contact" },
];

export type Testimonial = {
  quote: string;
  name: string;
  date?: string;
  rating?: number; // 1-5; omit for manual entries to default to 5 stars
  source?: "google"; // only set on reviews pulled from Google
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
  {
    quote:
      "Today I was able to close on my 1st ever home purchase. I had only a handful of knowledge in regards to what it takes to own a property, but after working with Mike I am happy to say I am a lot more knowledgeable than I ever thought I would be. Mike did a wonderful job answering all my questions in a timely manner and working with me even though I'm on a graveyard shift. If it wasn't for him, I don't think this process could have gone as smooth as it did. I am very grateful.",
    name: "Tiáuna Krieger",
    date: "2026",
  },
  {
    quote:
      "Great experience from start to finish. Mike was knowledgeable and responsive throughout the entire process. I always felt like a top priority. If you want a smooth and stress-free mortgage experience, look no further. Highly recommended!",
    name: "David",
    date: "2026",
  },
  {
    quote:
      "Very helpful and easy to deal with helping me with a lot of stuff that I didn't know.",
    name: "Suren Karagozyan",
    date: "2026",
  },
  {
    quote:
      "I don't normally write reviews, but Mike is absolutely the best! He made my home buying experience so stress-free. He asks all the hard questions upfront during pre-approval, so when you find a house, you can move fast. We actually closed early because of this! I also got to work with Suzanne for my loan processing and absolutely adored her. Love Mike and his team!",
    name: "Holly Gutierrez",
    date: "2026",
  },
  {
    quote:
      "Mike helped me get the best rate on my mortgage and was easy to work with.",
    name: "Ty",
    date: "2026",
  },
  {
    quote: "Great guy. The force is strong and followed the Jedi Code.",
    name: "Frank Galizia",
    date: "2026",
  },
  {
    quote:
      "Mike the Mortgage Jedi was awesome in getting our deal across the finish line for our clients! He was patient, hard-working, and very attentive in getting back to me throughout the transaction. Very grateful for hard-working people like him!",
    name: "Joanne Healea",
    date: "2026",
  },
  {
    quote:
      "Just wanted to say I made a good decision going with Mike Prenesti as my loan officer. I looked him up and had a good feeling about him, and he didn't let me down. He's always there for me when I need an answer. That made my stress a lot less.",
    name: "Young Kim",
    date: "2026",
  },
  {
    quote:
      "Mike was very knowledgeable and helpful with getting our loan approved and helped us through all the steps. Would definitely recommend!",
    name: "Amy Larios",
    date: "2025",
  },
  {
    quote:
      "It was an absolute pleasure to work with Mike. He answered all my questions and kept me updated during each step of the process. I highly recommend Mike and his expertise!",
    name: "C Sandoval",
    date: "2025",
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
