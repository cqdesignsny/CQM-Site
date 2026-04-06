"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { trackPageView } from "@/lib/analytics";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Analytics Component - GA4 + Meta Pixel + page view tracking
 *
 * Scripts load after page is interactive (afterInteractive strategy)
 * so they don't block rendering. Page views track on every route change.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);

    // GA4 page view on route change
    if (GA4_ID && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", GA4_ID, { page_path: pathname });
    }

    // Meta Pixel page view on route change
    if (META_PIXEL_ID && typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, [pathname]);

  return (
    <>
      {/* Google Analytics 4 */}
      {GA4_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', { send_page_view: true });
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel (Facebook/Instagram) */}
      {META_PIXEL_ID && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
