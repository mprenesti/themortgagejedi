"use client";

import { useEffect, useState } from "react";
import { FieldWrapper, Input, Select } from "./fields";
import {
  LEAD_SOURCE_LABEL,
  LEAD_SOURCE_OPTIONS,
  leadSourceDetailLabel,
  leadSourceNeedsDetail,
} from "@/lib/lead-source";
import { getLeadSourceAuto } from "@/lib/attribution";

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  detail: string;
  onDetailChange: (value: string) => void;
  error?: string;
  detailError?: string;
  required?: boolean;
  // When set, native names are added so plain FormData submissions pick the
  // values up automatically (used by the multipart second-opinion form).
  name?: string;
  detailName?: string;
  autoName?: string;
};

export default function LeadSourceField({
  value,
  onValueChange,
  detail,
  onDetailChange,
  error,
  detailError,
  required = true,
  name,
  detailName,
  autoName,
}: Props) {
  const [auto, setAuto] = useState("");

  useEffect(() => {
    setAuto(getLeadSourceAuto());
  }, []);

  const needsDetail = leadSourceNeedsDetail(value);

  return (
    <div className="space-y-4">
      <FieldWrapper label={LEAD_SOURCE_LABEL} required={required} error={error}>
        <Select
          name={name}
          required={required}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        >
          <option value="">Select one</option>
          {LEAD_SOURCE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FieldWrapper>

      {needsDetail ? (
        <FieldWrapper
          label={leadSourceDetailLabel(value)}
          required
          error={detailError}
        >
          <Input
            name={detailName}
            required
            value={detail}
            onChange={(e) => onDetailChange(e.target.value)}
            placeholder={
              value === "Agent or realtor referral"
                ? "Agent name"
                : "A quick note"
            }
          />
        </FieldWrapper>
      ) : null}

      {autoName ? (
        <input type="hidden" name={autoName} value={auto} readOnly />
      ) : null}
    </div>
  );
}
