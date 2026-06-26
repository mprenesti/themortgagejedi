"use client";

import { Printer } from "lucide-react";

export default function ChecklistPrintButton() {
  return (
    <button onClick={() => window.print()} className="btn-outline print:hidden">
      <Printer className="h-4 w-4" />
      Print / Download Checklist
    </button>
  );
}
