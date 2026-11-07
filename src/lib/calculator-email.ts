import { formatCurrency } from "./utils";

export type CalculatorEmailSnapshot = {
  calculatorName: string;
  homePrice: number;
  downPayment: number;
  downPercent: number;
  loanAmount: number;
  loanTermYears: number;
  interestRate: number;
  monthlyPi: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyPmi: number | null;
  monthlyTotal: number;
};

export const CALCULATOR_EMAIL_TAG = "calculator_email";

/** GHL contact custom field keys Mike created, in upsert order. */
export const CALCULATOR_GHL_FIELD_KEYS = [
  "contact.calc_home_price",
  "contact.calc_down_payment",
  "contact.calc_loan_amount",
  "contact.calc_loan_term",
  "contact.calc_interest_rate",
  "contact.calc_monthly_pi",
  "contact.calc_monthly_tax",
  "contact.calc_monthly_insurance",
  "contact.calc_total_monthly_payment",
] as const;

export type CalculatorGhlFieldKey = (typeof CALCULATOR_GHL_FIELD_KEYS)[number];

export const CALCULATOR_GHL_FIELD_ENV: Record<CalculatorGhlFieldKey, string> = {
  "contact.calc_home_price": "GHL_FIELD_CALC_HOME_PRICE",
  "contact.calc_down_payment": "GHL_FIELD_CALC_DOWN_PAYMENT",
  "contact.calc_loan_amount": "GHL_FIELD_CALC_LOAN_AMOUNT",
  "contact.calc_loan_term": "GHL_FIELD_CALC_LOAN_TERM",
  "contact.calc_interest_rate": "GHL_FIELD_CALC_INTEREST_RATE",
  "contact.calc_monthly_pi": "GHL_FIELD_CALC_MONTHLY_PI",
  "contact.calc_monthly_tax": "GHL_FIELD_CALC_MONTHLY_TAX",
  "contact.calc_monthly_insurance": "GHL_FIELD_CALC_MONTHLY_INSURANCE",
  "contact.calc_total_monthly_payment": "GHL_FIELD_CALC_TOTAL_MONTHLY_PAYMENT",
};

/** Display-ready strings, matching the contact note formatting. */
export function calculatorDisplayFields(
  calc: CalculatorEmailSnapshot,
): Record<CalculatorGhlFieldKey, string> {
  return {
    "contact.calc_home_price": formatCurrency(calc.homePrice),
    "contact.calc_down_payment": `${formatCurrency(calc.downPayment)} (${calc.downPercent}%)`,
    "contact.calc_loan_amount": formatCurrency(calc.loanAmount),
    "contact.calc_loan_term": `${calc.loanTermYears} years`,
    "contact.calc_interest_rate": `${calc.interestRate}%`,
    "contact.calc_monthly_pi": formatCurrency(calc.monthlyPi),
    "contact.calc_monthly_tax": formatCurrency(calc.monthlyTax),
    "contact.calc_monthly_insurance": formatCurrency(calc.monthlyInsurance),
    "contact.calc_total_monthly_payment": formatCurrency(calc.monthlyTotal),
  };
}
