"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

function monthlyPI(principal: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
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

export default function RentVsBuyCalculator() {
  const [rent, setRent] = useState(2000);
  const [price, setPrice] = useState(400000);
  const [downPct, setDownPct] = useState(10);
  const [rate, setRate] = useState(7.0);
  const [years, setYears] = useState(7);
  const [appreciation, setAppreciation] = useState(3);
  const [rentIncrease, setRentIncrease] = useState(3);

  const data = useMemo(() => {
    const down = (price * downPct) / 100;
    const loan = Math.max(price - down, 0);
    const pi = monthlyPI(loan, rate, 30);
    // Rough ownership costs: taxes+insurance+maintenance ~ 2%/yr of value
    const annualOwnExtra = price * 0.02;

    const rentSeries: number[] = [];
    const buySeries: number[] = [];
    const equitySeries: number[] = [];

    let cumulativeRent = 0;
    let cumulativeBuy = down; // upfront down payment + closing simplification
    let currentRent = rent;
    let homeValue = price;
    let loanBalance = loan;
    const monthlyRate = rate / 100 / 12;

    let breakEven: number | null = null;

    for (let y = 1; y <= years; y++) {
      cumulativeRent += currentRent * 12;
      currentRent *= 1 + rentIncrease / 100;

      // mortgage payments for the year
      cumulativeBuy += pi * 12 + annualOwnExtra;
      // reduce loan balance over 12 months
      for (let m = 0; m < 12; m++) {
        const interest = loanBalance * monthlyRate;
        const principal = pi - interest;
        loanBalance = Math.max(loanBalance - principal, 0);
      }
      homeValue *= 1 + appreciation / 100;
      const equity = homeValue - loanBalance;

      // Net cost of buying = money spent - equity gained (minus sale proceeds)
      const netBuyCost = cumulativeBuy - equity;

      rentSeries.push(cumulativeRent);
      buySeries.push(netBuyCost);
      equitySeries.push(equity);

      if (breakEven === null && netBuyCost <= cumulativeRent) {
        breakEven = y;
      }
    }

    const totalRent = cumulativeRent;
    const totalBuyNet = buySeries[buySeries.length - 1] ?? 0;
    const totalBuyGross = cumulativeBuy;
    const equityBuilt = equitySeries[equitySeries.length - 1] ?? 0;
    const netSavings = totalRent - totalBuyNet;

    return {
      rentSeries,
      buySeries,
      totalRent,
      totalBuyGross,
      totalBuyNet,
      equityBuilt,
      netSavings,
      breakEven,
    };
  }, [rent, price, downPct, rate, years, appreciation, rentIncrease]);

  // Build SVG chart
  const chart = useMemo(() => {
    const w = 520;
    const h = 240;
    const pad = 8;
    const all = [...data.rentSeries, ...data.buySeries];
    const max = Math.max(...all, 1);
    const min = Math.min(...all, 0);
    const n = data.rentSeries.length;
    const x = (i: number) => (n <= 1 ? pad : pad + (i * (w - 2 * pad)) / (n - 1));
    const y = (v: number) =>
      h - pad - ((v - min) / (max - min || 1)) * (h - 2 * pad);
    const toPath = (arr: number[]) =>
      arr.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
    return {
      w,
      h,
      rentPath: toPath(data.rentSeries),
      buyPath: toPath(data.buySeries),
    };
  }, [data]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-5 rounded-2xl border border-white/10 bg-charcoal p-6 sm:p-8">
        <Field label="Current Monthly Rent" value={rent} onChange={setRent} prefix="$" step={50} />
        <Field label="Home Purchase Price" value={price} onChange={setPrice} prefix="$" step={5000} />
        <Field label="Down Payment" value={downPct} onChange={setDownPct} suffix="%" />
        <Field label="Interest Rate" value={rate} onChange={setRate} suffix="%" step={0.125} />
        <div>
          <label className="mb-1.5 block font-heading text-sm font-medium uppercase tracking-wide text-gray-light">
            Years Planning to Stay: <span className="text-gold">{years}</span>
          </label>
          <input
            type="range"
            min={1}
            max={30}
            value={years}
            onChange={(e) => setYears(parseInt(e.target.value))}
            className="w-full accent-gold"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Annual Home Appreciation"
            value={appreciation}
            onChange={setAppreciation}
            suffix="%"
            step={0.5}
          />
          <Field
            label="Annual Rent Increase"
            value={rentIncrease}
            onChange={setRentIncrease}
            suffix="%"
            step={0.5}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-charcoal p-6">
          <h3 className="font-heading text-lg font-semibold text-white">
            Cumulative Cost Over {years} Years
          </h3>
          <svg
            viewBox={`0 0 ${chart.w} ${chart.h}`}
            className="mt-4 w-full"
            role="img"
            aria-label="Rent vs buy cumulative cost chart"
          >
            <path d={chart.rentPath} fill="none" stroke="#888888" strokeWidth={2.5} />
            <path d={chart.buyPath} fill="none" stroke="#FFE81A" strokeWidth={2.5} />
          </svg>
          <div className="mt-3 flex gap-6 text-sm">
            <span className="flex items-center gap-2 text-gray-light">
              <span className="h-2 w-4 rounded bg-gray-mid" /> Renting
            </span>
            <span className="flex items-center gap-2 text-gray-light">
              <span className="h-2 w-4 rounded bg-gold" /> Buying (net of equity)
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Stat label={`Total Cost of Renting (${years} yrs)`} value={formatCurrency(data.totalRent)} />
          <Stat label={`Total Cost of Buying (${years} yrs)`} value={formatCurrency(data.totalBuyGross)} />
          <Stat label={`Equity Built by Year ${years}`} value={formatCurrency(data.equityBuilt)} />
          <Stat
            label="Break-even Point"
            value={data.breakEven ? `Year ${data.breakEven}` : "Beyond range"}
          />
        </div>

        <div
          className={`rounded-2xl border p-6 ${
            data.netSavings >= 0
              ? "border-gold/30 bg-gradient-to-b from-charcoal to-black"
              : "border-white/10 bg-charcoal"
          }`}
        >
          <p className="text-sm uppercase tracking-wide text-gray-light">
            Net savings of buying vs renting
          </p>
          <p
            className={`mt-1 font-heading text-3xl font-bold ${
              data.netSavings >= 0 ? "text-gold" : "text-gray-light"
            }`}
          >
            {formatCurrency(data.netSavings)}
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-charcoal p-4">
      <p className="text-xs uppercase tracking-wide text-gray-mid">{label}</p>
      <p className="mt-1 font-heading text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
