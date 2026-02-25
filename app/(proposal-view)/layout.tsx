import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function ProposalViewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b border-white/10 bg-black">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={siteConfig.assets.logoWhitePath}
              alt={siteConfig.name}
              width={160}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <Link
            href="/proposals"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Build a Proposal
          </Link>
        </div>
      </header>
      <main className="min-h-screen">{children}</main>
      <footer className="border-t border-white/10 bg-black py-8 text-center text-sm text-white/50">
        <p>
          {siteConfig.name} &middot; {siteConfig.contact.streetAddress},{" "}
          {siteConfig.contact.locality}, {siteConfig.contact.region}{" "}
          {siteConfig.contact.postalCode} &middot;{" "}
          {siteConfig.contact.phoneDisplay}
        </p>
        <p className="mt-1">
          <Link href="/" className="text-white/50 underline hover:text-white/80">
            {siteConfig.url.replace("https://", "")}
          </Link>
        </p>
      </footer>
    </>
  );
}
