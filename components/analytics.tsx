"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

/**
 * Analytics Component - Handles page view tracking
 *
 * Why client component?
 * - usePathname() hook requires client-side rendering
 * - Analytics scripts typically need browser APIs
 *
 * Why useEffect?
 * - Runs after component mounts (client-side only)
 * - Tracks route changes automatically via Next.js router
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view on route change
    trackPageView(pathname);
  }, [pathname]);

  // TODO: Add platform-specific script tags here when IDs are configured
  // Example:
  // return (
  //   <>
  //     <Script
  //       strategy="afterInteractive"
  //       src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
  //     />
  //     <Script id="ga4-init" strategy="afterInteractive">
  //       {`
  //         window.dataLayer = window.dataLayer || [];
  //         function gtag(){dataLayer.push(arguments);}
  //         gtag('js', new Date());
  //         gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
  //       `}
  //     </Script>
  //   </>
  // );

  return null;
}





