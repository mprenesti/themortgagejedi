import type { ComponentPropsWithoutRef } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

function Table({ className, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-6 w-full max-w-full overflow-x-auto">
      <table
        className={cn(
          "w-full min-w-full border-collapse text-left text-sm text-gray-light",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function Thead({ className, ...props }: ComponentPropsWithoutRef<"thead">) {
  return (
    <thead
      className={cn(
        "border-b border-gold/40 bg-gold/10 font-heading text-sm font-semibold text-white",
        className,
      )}
      {...props}
    />
  );
}

function Th({ className, ...props }: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className={cn(
        "whitespace-nowrap px-4 py-3 text-left font-heading font-semibold text-white",
        className,
      )}
      {...props}
    />
  );
}

function Td({ className, ...props }: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className={cn(
        "border-t border-white/10 px-4 py-3 align-top text-gray-light",
        className,
      )}
      {...props}
    />
  );
}

const mdxComponents = {
  table: Table,
  thead: Thead,
  th: Th,
  td: Td,
};

export default function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      components={mdxComponents}
    />
  );
}
