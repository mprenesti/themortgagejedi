export type GuideSection = {
  id: string;
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  tag: string;
  description: string;
  intro: string;
  sections: GuideSection[];
};

export const GUIDES: Guide[] = [
  {
    slug: "first-time-homebuyer",
    title: "First-Time Homebuyer Guide",
    tag: "Purchase",
    description:
      "Everything you need to know about buying your first home. FHA, conventional, VA loans, down payment assistance, the step-by-step process, and common mistakes to avoid.",
    intro:
      "Buying your first home feels huge. It does not have to be scary. This guide walks you through how it actually works, in plain English, so you know what to expect before you ever fill out a form.",
    sections: [
      {
        id: "am-i-ready",
        heading: "Am I ready to buy?",
        body: [
          "You do not need perfect credit or a giant savings account. You need steady income, a plan, and a lender who tells you the truth.",
          "Start by asking a simple question. Do you plan to stay put for a few years? If yes, buying usually beats renting over time. If you might move in a year, renting can be the smarter play.",
        ],
      },
      {
        id: "payment-first",
        heading: "Start with the payment, not the price",
        body: [
          "Most lenders lead with how much you qualify for. I lead with a different question. Where do you want your monthly payment to be?",
          "We work backward from a payment you are comfortable with. That keeps you safe and keeps your life fun. A house should fit your budget, not swallow it.",
        ],
      },
      {
        id: "loan-options",
        heading: "Loan options for first time buyers",
        body: ["You have more choices than most people realize. Here are the big ones."],
        bullets: [
          "FHA. As low as 3.5% down. Flexible credit. Great for a lot of first time buyers.",
          "Conventional. As little as 3% to 5% down. Often lower long term cost once you hit 20% equity.",
          "VA. Zero down for eligible veterans and active duty service members. No monthly mortgage insurance.",
          "Down payment assistance. Nevada has programs that help with the down payment and closing costs.",
        ],
      },
      {
        id: "the-process",
        heading: "The step by step process",
        body: ["Here is the path from curious to keys in hand."],
        bullets: [
          "We talk about your goals and your comfortable payment.",
          "I get you pre-approved so you can shop with confidence.",
          "You find a home and we make an offer.",
          "We lock your rate, order the appraisal, and move to closing.",
          "You sign, you get the keys, and I check in long after.",
        ],
      },
      {
        id: "mistakes",
        heading: "Common mistakes to avoid",
        bullets: [
          "Shopping for a home before getting pre-approved.",
          "Opening new credit or financing a car during the process.",
          "Draining every dollar into the down payment with nothing left for reserves.",
          "Only talking to one lender. It pays to compare.",
        ],
      },
    ],
  },
  {
    slug: "self-employed",
    title: "Self-Employed Mortgage Guide",
    tag: "Self-Employed",
    description:
      "Bank statement loans, 1099 programs, P&L loans. Real options for freelancers, contractors, and business owners whose tax returns don't tell the full story.",
    intro:
      "If you are self-employed, you already know the drill. You write off everything you can, your tax returns look lean, and then a bank tells you that you do not make enough. There is a better way.",
    sections: [
      {
        id: "the-problem",
        heading: "Why tax returns work against you",
        body: [
          "Good tax strategy lowers your taxable income. That is smart. But traditional loans use that same low number to decide how much you qualify for.",
          "The result is frustrating. Your business is healthy and your bank account proves it, yet the standard loan says no. You are not the problem. The wrong loan is.",
        ],
      },
      {
        id: "bank-statement",
        heading: "Bank statement loans",
        body: [
          "These loans qualify you on your actual deposits, not your tax returns. We use 12 or 24 months of bank statements to show real cash flow.",
          "If money is coming in, we can usually make it work. No tax returns required.",
        ],
      },
      {
        id: "1099-and-pl",
        heading: "1099 and P&L loans",
        body: ["Two more options built for how you really earn."],
        bullets: [
          "1099 loans. Perfect for independent contractors and gig workers. We use your 1099 income to qualify.",
          "P&L loans. Qualify with a profit and loss statement prepared by your CPA.",
          "Asset based options. In some cases we can qualify you on your assets.",
        ],
      },
      {
        id: "what-you-need",
        heading: "What you will need",
        bullets: [
          "12 to 24 months of bank statements, personal or business.",
          "A CPA prepared P&L if we go that route.",
          "Your business license.",
          "A credit report, which I pull for you.",
        ],
      },
    ],
  },
  {
    slug: "va-loans",
    title: "VA Home Loan Guide",
    tag: "VA Loans",
    description:
      "0% down, no monthly mortgage insurance, and competitive rates. Eligibility, entitlement, funding fees, and VA loan benefits explained.",
    intro:
      "You served. This benefit is yours. The VA loan is one of the strongest programs in the country, and a lot of veterans never use it because nobody explained it clearly. Let me fix that.",
    sections: [
      {
        id: "who-qualifies",
        heading: "Who qualifies",
        body: [
          "Most veterans, active duty service members, National Guard, Reserves, and some surviving spouses are eligible.",
          "Eligibility is based on your service history. We confirm it with your Certificate of Eligibility, which I help you get.",
        ],
      },
      {
        id: "benefits",
        heading: "The benefits that matter",
        bullets: [
          "Zero down payment on most purchases.",
          "No monthly mortgage insurance, which keeps your payment lower.",
          "Competitive interest rates.",
          "Flexible credit guidelines.",
          "You can reuse the benefit again and again.",
        ],
      },
      {
        id: "funding-fee",
        heading: "Entitlement and the funding fee",
        body: [
          "Entitlement is the amount the VA guarantees on your behalf. It is what lets you buy with no money down.",
          "The funding fee is a one time cost that keeps the program running. Many disabled veterans are exempt. The fee can usually be rolled into the loan so it is not out of pocket.",
        ],
      },
      {
        id: "how-to-use",
        heading: "How to put it to work",
        body: [
          "We start with your comfortable payment, confirm your eligibility, and get you pre-approved. Then you shop knowing your benefit is ready to go.",
        ],
      },
    ],
  },
  {
    slug: "refinance",
    title: "Mortgage Refinance Guide",
    tag: "Refinancing",
    description:
      "Rate-and-term, cash-out, FHA streamline, VA IRRRL, DSCR. Learn when refinancing actually saves you money and which option fits your situation.",
    intro:
      "Refinancing can save you real money. It can also cost you money if the timing is wrong. Here is how to tell the difference before you commit.",
    sections: [
      {
        id: "when-it-makes-sense",
        heading: "When a refinance actually helps",
        body: [
          "A refinance makes sense when it lowers your payment, shortens your term, or gets you cash you need at a fair cost.",
          "The real test is simple. How long until the savings pay back the cost of the refinance? If you will stay past that point, it is usually worth it.",
        ],
      },
      {
        id: "rate-and-term",
        heading: "Rate and term refinance",
        body: [
          "This swaps your current loan for a new one with a better rate or a shorter term. No cash comes out. The goal is a lower payment or faster payoff.",
        ],
      },
      {
        id: "cash-out",
        heading: "Cash out refinance",
        body: [
          "This lets you tap your equity for renovations, debt payoff, or investing. You get a new first mortgage and money in hand.",
          "It can be powerful. It can also be a trap if you are just moving debt around. We run the numbers so it actually moves you forward.",
        ],
      },
      {
        id: "streamline",
        heading: "Streamline and investor options",
        bullets: [
          "FHA streamline. A simpler refinance for existing FHA loans.",
          "VA IRRRL. The VA streamline for existing VA loans. Low friction, low cost.",
          "DSCR refinance. For investors, we can refinance based on the property rental income.",
        ],
      },
    ],
  },
  {
    slug: "investor",
    title: "Real Estate Investor Guide",
    tag: "Investing",
    description:
      "DSCR, bank statement, conventional investor loans. Loan strategies for rental property investors including no-income-verification options.",
    intro:
      "Building a rental portfolio is a numbers game. The right financing lets you keep buying. The wrong financing stops you cold. Here are the tools that keep you moving.",
    sections: [
      {
        id: "how-investors-qualify",
        heading: "How investors really qualify",
        body: [
          "You do not always need to show personal income to buy an investment property. In many cases the property qualifies itself.",
          "That is the mindset shift. We look at the deal, not just your tax returns.",
        ],
      },
      {
        id: "dscr",
        heading: "DSCR loans",
        body: [
          "DSCR stands for Debt Service Coverage Ratio. The loan qualifies on the property rental income, not your personal income.",
          "If the rent covers the payment, you can usually qualify. No pay stubs, no tax returns, and no cap on how many properties you own.",
        ],
      },
      {
        id: "other-options",
        heading: "Other investor loan options",
        bullets: [
          "Bank statement loans that qualify on real deposits.",
          "Conventional investor loans for stronger personal profiles.",
          "1099 and P&L options for self employed investors.",
        ],
      },
      {
        id: "portfolio",
        heading: "Building a portfolio",
        body: [
          "The key is financing that scales. We line up loans that let you buy the next one, and the one after that, without hitting a wall.",
        ],
      },
    ],
  },
  {
    slug: "home-equity",
    title: "Home Equity Guide",
    tag: "Equity",
    description:
      "HELOCs, home equity loans, cash-out refinance. Learn which option fits your goals and when each one makes sense.",
    intro:
      "You have built equity in your home. Now you want to use some of it. There are three main ways to do that, and picking the right one matters.",
    sections: [
      {
        id: "three-options",
        heading: "The three ways to tap equity",
        bullets: [
          "HELOC. A revolving line of credit you draw from as needed.",
          "Home equity loan. A lump sum with a fixed payment.",
          "Cash out refinance. A new first mortgage that pulls cash out.",
        ],
      },
      {
        id: "protect-your-rate",
        heading: "Protect your low first mortgage rate",
        body: [
          "If you locked a low rate years ago, you probably do not want to touch it. A HELOC or home equity loan sits behind your first mortgage and leaves it alone.",
          "A cash out refinance replaces your first mortgage. That only makes sense if the new terms still work in your favor.",
        ],
      },
      {
        id: "when-each-fits",
        heading: "When each one fits",
        bullets: [
          "Ongoing or unknown costs, like a long renovation. A HELOC gives you flexibility.",
          "One large known cost. A home equity loan gives you a fixed payment.",
          "You also want a better first mortgage. A cash out refinance can do both at once.",
        ],
      },
    ],
  },
  {
    slug: "fha-vs-conventional",
    title: "FHA vs Conventional Guide",
    tag: "Purchase",
    description:
      "Side-by-side comparison of FHA and conventional loans. Credit score requirements, down payment options, PMI differences, and how to choose the right one for your situation.",
    intro:
      "FHA or conventional? It is one of the first questions I get. The honest answer is that it depends. Here is exactly what it depends on so you can choose with confidence.",
    sections: [
      {
        id: "the-difference",
        heading: "The basic difference",
        body: [
          "An FHA loan is backed by the government. That backing lets lenders offer flexible credit and low down payments.",
          "A conventional loan is not government backed. It usually wants stronger credit, but it can cost less over time.",
        ],
      },
      {
        id: "credit-and-down",
        heading: "Credit and down payment",
        bullets: [
          "FHA. Works with lower credit scores and as little as 3.5% down.",
          "Conventional. Rewards higher credit and can start around 3% to 5% down.",
          "More down usually means a lower payment and less insurance cost.",
        ],
      },
      {
        id: "pmi",
        heading: "The PMI factor",
        body: [
          "Here is what most people miss. FHA mortgage insurance often lasts the life of the loan. Conventional PMI drops off once you reach 20% equity.",
          "So a conventional loan can cost less over time, even when the monthly payment looks similar up front.",
        ],
      },
      {
        id: "how-to-choose",
        heading: "How to choose",
        body: [
          "We run the numbers both ways using your real credit, savings, and goals. Then you see the true cost of each and pick the one that fits your life.",
        ],
      },
    ],
  },
  {
    slug: "down-payment-assistance",
    title: "Down Payment Assistance Guide",
    tag: "First-Time Buyers",
    description:
      "Nevada down payment assistance programs, grants, and gift fund options. How to buy a home with little to no money out of pocket.",
    intro:
      "A lot of people think they need 20% down to buy a home. You do not. Between assistance programs and gift funds, you may be able to buy with little to nothing out of pocket.",
    sections: [
      {
        id: "what-it-is",
        heading: "What down payment assistance is",
        body: [
          "Down payment assistance helps cover your down payment and sometimes your closing costs. It can come as a grant you do not repay or a second loan with friendly terms.",
          "The goal is simple. Get you into a home without draining every dollar you have.",
        ],
      },
      {
        id: "nevada-programs",
        heading: "Nevada programs",
        body: [
          "Nevada has statewide programs designed to help buyers get in the door. Availability and terms change over time, so we check what is live when you are ready.",
          "I match you to the program that fits your income, your area, and your goals.",
        ],
      },
      {
        id: "gift-funds",
        heading: "Gift funds",
        body: [
          "Family can help too. Most loan programs let a relative gift you money for the down payment.",
          "We document it with a simple gift letter so it counts. That is often the fastest path to closing.",
        ],
      },
      {
        id: "how-to-qualify",
        heading: "How to qualify",
        body: [
          "We start with your comfortable payment, check your eligibility for assistance, and build a plan. You may be closer to owning than you think.",
        ],
      },
    ],
  },
];

export function getAllGuides(): Guide[] {
  return GUIDES;
}

export function getGuide(slug: string): Guide | null {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}

export function getGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}

export function getRelatedGuides(slug: string, limit = 3): Guide[] {
  const current = GUIDES.find((g) => g.slug === slug);
  const others = GUIDES.filter((g) => g.slug !== slug);
  if (!current) return others.slice(0, limit);
  const sameTag = others.filter((g) => g.tag === current.tag);
  const rest = others.filter((g) => g.tag !== current.tag);
  return [...sameTag, ...rest].slice(0, limit);
}
