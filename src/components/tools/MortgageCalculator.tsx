"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

function monthlyPI(principal: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
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
          min={min}
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

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPct, setDownPct] = useState(10);
  const [rate, setRate] = useState(7.0);
  const [term, setTerm] = useState(30);
  const [annualTax, setAnnualTax] = useState(3000);
  const [annualIns, setAnnualIns] = useState(1800);
  const [showAmort, setShowAmort] = useState(false);

  const result = useMemo(() => {
    const downPayment = (homePrice * downPct) / 100;
    const loanAmount = Math.max(homePrice - downPayment, 0);
    const pi = monthlyPI(loanAmount, rate, term);
    const tax = annualTax / 12;
    const ins = annualIns / 12;
    const total = pi + tax + ins;
    return { downPayment, loanAmount, pi, tax, ins, total };
  }, [homePrice, downPct, rate, term, annualTax, annualIns]);

  const schedule = useMemo(() => {
    if (!showAmort) return [];
    const r = rate / 100 / 12;
    let balance = result.loanAmount;
    const rows: { year: number; principal: number; interest: number; balance: number }[] = [];
    let yPrincipal = 0;
    let yInterest = 0;
    for (let m = 1; m <= term * 12; m++) {
      const interest = balance * r;
      const principal = result.pi - interest;
      balance = Math.max(balance - principal, 0);
      yPrincipal += principal;
      yInterest += interest;
      if (m % 12 === 0) {
        rows.push({
          year: m / 12,
          principal: yPrincipal,
          interest: yInterest,
          balance,
        });
        yPrincipal = 0;
        yInterest = 0;
      }
    }
    return rows;
  }, [showAmort, rate, term, result.loanAmount, result.pi]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5 rounded-2xl border border-white/10 bg-charcoal p-6 sm:p-8">
        <div>
          <NumberField
            label="Home Price"
            value={homePrice}
            onChange={setHomePrice}
            prefix="$"
            step={5000}
          />
          <input
            type="range"
            min={100000}
            max={2000000}
            step={5000}
            value={homePrice}
            onChange={(e) => setHomePrice(parseFloat(e.target.value))}
            className="mt-3 w-full accent-gold"
          />
        </div>

        <div>
          <NumberField
            label="Down Payment"
            value={downPct}
            onChange={(v) => setDownPct(Math.min(Math.max(v, 0), 100))}
            suffix="%"
          />
          <input
            type="range"
            min={0}
            max={50}
            step={1}
            value={downPct}
            onChange={(e) => setDownPct(parseFloat(e.target.value))}
            className="mt-3 w-full accent-gold"
          />
          <p className="mt-1 text-sm text-gray-mid">
            {formatCurrency(result.downPayment)} down ·{" "}
            {formatCurrency(result.loanAmount)} loan
          </p>
        </div>

        <NumberField
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

        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField
            label="Annual Property Tax"
            value={annualTax}
            onChange={setAnnualTax}
            prefix="$"
            step={100}
          />
          <NumberField
            label="Annual Insurance"
            value={annualIns}
            onChange={setAnnualIns}
            prefix="$"
            step={100}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-gold/30 bg-gradient-to-b from-charcoal to-black p-6 sm:p-8">
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-gray-light">
            Total Monthly Payment
          </p>
          <p className="mt-1 font-heading text-5xl font-bold text-gold">
            {formatCurrency(result.total)}
          </p>

          <dl className="mt-6 space-y-3 border-t border-white/10 pt-5">
            <Row label="Principal & Interest" value={result.pi} />
            <Row label="Property Tax" value={result.tax} />
            <Row label="Insurance" value={result.ins} />
          </dl>

          <button
            onClick={() => setShowAmort((s) => !s)}
            className="mt-6 text-sm font-semibold text-gold hover:underline"
          >
            {showAmort ? "Hide" : "Show"} amortization breakdown
          </button>
        </div>

        {showAmort ? (
          <div className="max-h-80 overflow-y-auto rounded-2xl border border-white/10 bg-charcoal p-4">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-charcoal text-left text-gray-mid">
                <tr>
                  <th className="py-2">Year</th>
                  <th className="py-2">Principal</th>
                  <th className="py-2">Interest</th>
                  <th className="py-2">Balance</th>
                </tr>
              </thead>
              <tbody className="text-gray-light">
                {schedule.map((row) => (
                  <tr key={row.year} className="border-t border-white/5">
                    <td className="py-2">{row.year}</td>
                    <td className="py-2">{formatCurrency(row.principal)}</td>
                    <td className="py-2">{formatCurrency(row.interest)}</td>
                    <td className="py-2">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-gray-light">{label}</dt>
      <dd className="font-heading font-semibold text-white">
        {formatCurrency(value)}
      </dd>
    </div>
  );
}
