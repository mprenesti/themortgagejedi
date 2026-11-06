"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { formatCurrency } from "@/lib/utils";

function monthlyPI(principal: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

function clampPercent(value: number) {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(value, 100);
}

function clampDownDollars(amount: number, homePrice: number) {
  if (!Number.isFinite(amount) || amount < 0) return 0;
  if (!Number.isFinite(homePrice) || homePrice <= 0) return 0;
  return Math.min(Math.round(amount), Math.round(homePrice));
}

function percentFromDollars(amount: number, homePrice: number) {
  if (homePrice <= 0) return 0;
  return Math.round((amount / homePrice) * 10000) / 100;
}

function dollarsFromPercent(pct: number, homePrice: number) {
  return clampDownDollars((homePrice * clampPercent(pct)) / 100, homePrice);
}

function formatDollarInput(amount: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);
}

function countDigits(value: string) {
  return (value.match(/\d/g) || []).length;
}

function cursorAfterDigits(formatted: string, digitCount: number) {
  if (digitCount <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (formatted[i] >= "0" && formatted[i] <= "9") {
      seen += 1;
      if (seen === digitCount) return i + 1;
    }
  }
  return formatted.length;
}

function sanitizeDollarChange(raw: string, cursor: number) {
  const digitsBefore = countDigits(raw.slice(0, Math.max(cursor, 0)));
  let digits = raw.replace(/[^\d]/g, "");
  if (digits.length > 10) digits = digits.slice(0, 10);
  if (digits === "") return { text: "", cursor: 0, value: null as number | null };
  const value = Number.parseInt(digits, 10);
  if (!Number.isFinite(value) || value < 0) {
    return { text: "", cursor: 0, value: null };
  }
  const text = formatDollarInput(value);
  return { text, cursor: cursorAfterDigits(text, digitsBefore), value };
}

function displayPercent(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Number(value.toFixed(2));
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

function CommaDollarField({
  label,
  text,
  onChange,
  onBlur,
}: {
  label: string;
  text: string;
  onChange: (formatted: string, value: number | null) => void;
  onBlur?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (cursorRef.current === null || !inputRef.current) return;
    inputRef.current.setSelectionRange(cursorRef.current, cursorRef.current);
    cursorRef.current = null;
  }, [text]);

  return (
    <label className="block">
      <span className="mb-1.5 block font-heading text-sm font-medium uppercase tracking-wide text-gray-light">
        {label}
      </span>
      <div className="flex items-center rounded-md border border-white/15 bg-black/60 focus-within:border-gold">
        <span className="pl-3 text-gray-mid">$</span>
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={text}
          onChange={(e) => {
            const next = sanitizeDollarChange(
              e.target.value,
              e.target.selectionStart ?? e.target.value.length,
            );
            cursorRef.current = next.cursor;
            onChange(next.text, next.value);
            requestAnimationFrame(() => {
              if (cursorRef.current === null || !inputRef.current) return;
              inputRef.current.setSelectionRange(
                cursorRef.current,
                cursorRef.current,
              );
            });
          }}
          onBlur={onBlur}
          className="w-full bg-transparent px-3 py-3 text-white focus:outline-none"
        />
      </div>
    </label>
  );
}

const DEFAULT_PRICE = 400000;
const DEFAULT_DOWN_PCT = 10;

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(DEFAULT_PRICE);
  const [priceText, setPriceText] = useState(formatDollarInput(DEFAULT_PRICE));
  const [downPct, setDownPct] = useState(DEFAULT_DOWN_PCT);
  const [downAmount, setDownAmount] = useState(
    dollarsFromPercent(DEFAULT_DOWN_PCT, DEFAULT_PRICE),
  );
  const [dollarText, setDollarText] = useState(
    formatDollarInput(dollarsFromPercent(DEFAULT_DOWN_PCT, DEFAULT_PRICE)),
  );
  const [lastEdited, setLastEdited] = useState<"percent" | "dollars">("percent");
  const [rate, setRate] = useState(7.0);
  const [term, setTerm] = useState(30);
  const [annualTax, setAnnualTax] = useState(3000);
  const [taxText, setTaxText] = useState(formatDollarInput(3000));
  const [annualIns, setAnnualIns] = useState(1800);
  const [insText, setInsText] = useState(formatDollarInput(1800));
  const [showAmort, setShowAmort] = useState(false);

  const applyPercent = (rawPct: number) => {
    const pct = clampPercent(rawPct);
    const dollars = dollarsFromPercent(pct, homePrice);
    setLastEdited("percent");
    setDownPct(pct);
    setDownAmount(dollars);
    setDollarText(formatDollarInput(dollars));
  };

  const applyDollars = (formatted: string, parsed: number | null) => {
    setLastEdited("dollars");
    if (parsed === null) {
      setDownAmount(0);
      setDownPct(0);
      setDollarText("");
      return;
    }
    const dollars = clampDownDollars(parsed, homePrice);
    setDownAmount(dollars);
    setDownPct(percentFromDollars(dollars, homePrice));
    setDollarText(
      dollars === parsed ? formatted : formatDollarInput(dollars),
    );
  };

  const syncDownForPrice = (price: number, capToPrice: boolean) => {
    if (lastEdited === "dollars") {
      const dollars =
        capToPrice && price > 0
          ? clampDownDollars(downAmount, price)
          : downAmount;
      setDownAmount(dollars);
      setDownPct(
        price > 0 ? Math.min(percentFromDollars(dollars, price), 100) : 0,
      );
      setDollarText(
        dollars === 0 && dollarText === "" ? "" : formatDollarInput(dollars),
      );
    } else {
      const dollars = dollarsFromPercent(downPct, price);
      setDownAmount(dollars);
      setDollarText(formatDollarInput(dollars));
    }
  };

  const applyHomePrice = (
    nextPrice: number,
    formatted?: string,
    capToPrice = formatted === undefined,
  ) => {
    const price = Number.isFinite(nextPrice) && nextPrice > 0 ? nextPrice : 0;
    setHomePrice(price);
    if (formatted !== undefined) {
      setPriceText(formatted);
    } else {
      setPriceText(price > 0 ? formatDollarInput(price) : "");
    }
    syncDownForPrice(price, capToPrice);
  };

  const result = useMemo(() => {
    const downPayment =
      lastEdited === "dollars"
        ? downAmount
        : (homePrice * clampPercent(downPct)) / 100;
    const loanAmount = Math.max(homePrice - Math.min(downPayment, homePrice), 0);
    const pi = monthlyPI(loanAmount, rate, term);
    const tax = annualTax / 12;
    const ins = annualIns / 12;
    const total = pi + tax + ins;
    return { downPayment, loanAmount, pi, tax, ins, total };
  }, [homePrice, downPct, downAmount, lastEdited, rate, term, annualTax, annualIns]);

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
          <CommaDollarField
            label="Home Price"
            text={priceText}
            onChange={(formatted, value) => applyHomePrice(value ?? 0, formatted)}
            onBlur={() => {
              if (homePrice > 0) syncDownForPrice(homePrice, true);
            }}
          />
          <input
            type="range"
            min={100000}
            max={2000000}
            step={5000}
            value={
              homePrice >= 100000 ? Math.min(homePrice, 2000000) : 100000
            }
            onChange={(e) => applyHomePrice(parseFloat(e.target.value))}
            className="mt-3 w-full accent-gold"
          />
        </div>

        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            <CommaDollarField
              label="Down Payment ($)"
              text={dollarText}
              onChange={applyDollars}
            />
            <NumberField
              label="Down Payment (%)"
              value={displayPercent(downPct)}
              onChange={applyPercent}
              suffix="%"
              step={0.01}
              min={0}
            />
          </div>
          <input
            type="range"
            min={0}
            max={50}
            step={1}
            value={Math.min(displayPercent(downPct), 50)}
            onChange={(e) => applyPercent(parseFloat(e.target.value))}
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
          <CommaDollarField
            label="Annual Property Tax"
            text={taxText}
            onChange={(formatted, value) => {
              setTaxText(formatted);
              setAnnualTax(value ?? 0);
            }}
          />
          <CommaDollarField
            label="Annual Insurance"
            text={insText}
            onChange={(formatted, value) => {
              setInsText(formatted);
              setAnnualIns(value ?? 0);
            }}
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
