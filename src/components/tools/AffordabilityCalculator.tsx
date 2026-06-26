"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

function maxLoanFromPayment(payment: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (payment <= 0) return 0;
  if (r === 0) return payment * n;
  return (payment * (1 - Math.pow(1 + r, -n))) / r;
}

function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 100,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-heading text-sm font-medium uppercase tracking-wide text-gray-light">
        {label}
      </span>
      <div className="flex items-center rounded-md border border-white/15 bg-black/60 focus-within:border-gold">
        {prefix ? <span className="pl-3 text-gray-mid">{prefix}</span> : null}
        <input
          type="number"
          min={0}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full bg-transparent px-3 py-3 text-white focus:outline-none"
        />
        {suffix ? <span className="pr-3 text-gray-mid">{suffix}</span> : null}
      </div>
    </label>
  );
}

export default function AffordabilityCalculator() {
  const [income, setIncome] = useState(8000);
  const [debts, setDebts] = useState(500);
  const [down, setDown] = useState(40000);
  const [rate, setRate] = useState(7.0);
  const [term, setTerm] = useState(30);

  const result = useMemo(() => {
    // Front-end: 28% of gross income toward housing (PITI)
    const frontPayment = income * 0.28;
    // Back-end: 36% of gross income toward all debts
    const backPayment = Math.max(income * 0.36 - debts, 0);

    // Estimate taxes+insurance as ~1.25% of home value annually -> rough monthly
    // We solve P&I assuming ~20% of payment goes to tax/insurance.
    const piFront = frontPayment * 0.8;
    const piBack = backPayment * 0.8;

    const loanFront = maxLoanFromPayment(piFront, rate, term);
    const loanBack = maxLoanFromPayment(piBack, rate, term);

    const homeFront = loanFront + down;
    const homeBack = loanBack + down;

    const estPayment = Math.min(frontPayment, backPayment);
    const pctOfIncome = income > 0 ? (estPayment / income) * 100 : 0;

    return { homeFront, homeBack, estPayment, pctOfIncome };
  }, [income, debts, down, rate, term]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5 rounded-2xl border border-white/10 bg-charcoal p-6 sm:p-8">
        <Field
          label="Monthly Gross Income"
          value={income}
          onChange={setIncome}
          prefix="$"
        />
        <Field
          label="Monthly Debts (car, student loans, etc.)"
          value={debts}
          onChange={setDebts}
          prefix="$"
          step={50}
        />
        <Field
          label="Down Payment Available"
          value={down}
          onChange={setDown}
          prefix="$"
          step={1000}
        />
        <Field
          label="Interest Rate"
          value={rate}
          onChange={setRate}
          suffix="%"
          step={0.125}
        />
        <label className="block">
          <span className="mb-1.5 block font-heading text-sm font-medium uppercase tracking-wide text-gray-light">
            Loan Term
          </span>
          <select
            value={term}
            onChange={(e) => setTerm(parseInt(e.target.value))}
            className="w-full rounded-md border border-white/15 bg-black/60 px-3 py-3 text-white focus:border-gold focus:outline-none"
          >
            {[30, 20, 15, 10].map((t) => (
              <option key={t} value={t}>
                {t} years
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gold/30 bg-gradient-to-b from-charcoal to-black p-6">
            <p className="text-sm uppercase tracking-wide text-gray-light">
              Max Home Price
            </p>
            <p className="text-xs text-gray-mid">28% front-end DTI</p>
            <p className="mt-2 font-heading text-3xl font-bold text-gold">
              {formatCurrency(result.homeFront)}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-charcoal p-6">
            <p className="text-sm uppercase tracking-wide text-gray-light">
              Max Home Price
            </p>
            <p className="text-xs text-gray-mid">36% back-end DTI</p>
            <p className="mt-2 font-heading text-3xl font-bold text-white">
              {formatCurrency(result.homeBack)}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-charcoal p-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-light">Estimated Monthly Payment</span>
            <span className="font-heading font-semibold text-white">
              {formatCurrency(result.estPayment)}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-gray-light">Payment as % of income</span>
            <span className="font-heading font-semibold text-white">
              {result.pctOfIncome.toFixed(0)}%
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black p-6">
          <h3 className="font-heading text-lg font-semibold text-gold">
            Front-end vs. back-end DTI
          </h3>
          <p className="mt-2 text-sm text-gray-light">
            <span className="font-semibold text-white">Front-end DTI</span> looks
            at how much of your gross monthly income goes toward your housing
            payment alone. Lenders generally like this at 28% or below.
          </p>
          <p className="mt-2 text-sm text-gray-light">
            <span className="font-semibold text-white">Back-end DTI</span>{" "}
            includes <em>all</em> your monthly debts — car payments, student
            loans, credit cards — plus housing. Lenders typically want this at
            36% or below, though many programs allow more.
          </p>
        </div>
      </div>
    </div>
  );
}
