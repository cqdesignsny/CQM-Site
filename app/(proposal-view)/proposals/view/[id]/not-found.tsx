 "use client";

import Link from "next/link";
import { FileX } from "lucide-react";
import { useProposalLocale } from "@/lib/i18n/use-proposal-locale";

export default function ProposalNotFound() {
  const { pt } = useProposalLocale();

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-gradient-to-b from-black to-zinc-950 px-4">
      <div className="text-center">
        <FileX className="mx-auto mb-6 h-16 w-16 text-white/20" />
        <h1 className="text-2xl font-bold text-white">{pt("proposal.notFound")}</h1>
        <p className="mt-3 max-w-md text-sm text-white/50">
          {pt("proposal.notFoundMessage")}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white"
          >
            {pt("proposal.goHome")}
          </Link>
          <Link
            href="/proposals"
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            {pt("proposal.buildProposal")}
          </Link>
        </div>
      </div>
    </div>
  );
}
