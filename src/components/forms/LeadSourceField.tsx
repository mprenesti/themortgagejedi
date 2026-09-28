"use client";

import { useEffect, useState } from "react";
import { FieldWrapper, Input, Select } from "./fields";
import {
  LEAD_SOURCE_DETAIL_LABEL,
  LEAD_SOURCE_DETAIL_PLACEHOLDER,
  LEAD_SOURCE_LABEL,
  LEAD_SOURCE_OPTIONS,
  leadSourceShowsDetail,
} from "@/lib/lead-source";
import { getLeadSourceAuto } from "@/lib/attribution";

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  detail: string;
  onDetailChange: (value: string) => void;
  error?: string;
  required?: boolean;
  // When true, render a tighter layout for compact spaces (newsletter bar).
  compact?: boolean;
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
  required = true,
  compact = false,
  name,
  detailName,
  autoName,
}: Props) {
  const [auto, setAuto] = useState("");

  useEffect(() => {
    setAuto(getLeadSourceAuto());
  }, []);

  const showDetail = leadSourceShowsDetail(value);

  return (
    <div className={compact ? "space-y-2" : "space-y-4"}>
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

      {showDetail ? (
        <FieldWrapper label={LEAD_SOURCE_DETAIL_LABEL}>
          <Input
            name={detailName}
            value={detail}
            onChange={(e) => onDetailChange(e.target.value)}
            placeholder={LEAD_SOURCE_DETAIL_PLACEHOLDER}
          />
        </FieldWrapper>
      ) : (
        // Keep the field present (empty) for FormData submissions even when the
        // input is hidden, so the multipart form never omits the key.
        detailName ? (
          <input type="hidden" name={detailName} value={detail} readOnly />
        ) : null
      )}

      {autoName ? (
        <input type="hidden" name={autoName} value={auto} readOnly />
      ) : null}
    </div>
  );
}
