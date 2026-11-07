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
