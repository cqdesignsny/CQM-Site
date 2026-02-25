"use client";

export function PrintStyles() {
  return (
    <style jsx global>{`
      @media print {
        /* Hide non-essential elements */
        .no-print,
        header,
        footer,
        button {
          display: none !important;
        }

        /* Reset background for print */
        body,
        main,
        div {
          background: white !important;
          color: black !important;
        }

        /* Fix text colors for print */
        h1,
        h2,
        h3,
        h4,
        p,
        span,
        li {
          color: black !important;
        }

        /* Service descriptions */
        .text-white\\/40,
        .text-white\\/50,
        .text-white\\/60 {
          color: #666 !important;
        }

        /* Category icons stay visible */
        .text-red-400 {
          color: #cc0000 !important;
        }

        /* Green for discount */
        .text-green-400 {
          color: #16a34a !important;
        }

        /* Borders */
        .border-white\\/10,
        .border-white\\/5 {
          border-color: #e5e7eb !important;
        }

        /* Grand total */
        .text-3xl {
          color: #cc0000 !important;
        }

        /* Layout */
        .container {
          max-width: 100% !important;
          padding: 0 !important;
        }

        /* Cards */
        .rounded-2xl,
        .rounded-xl {
          border-radius: 4px !important;
          box-shadow: none !important;
          background: white !important;
          border: 1px solid #e5e7eb !important;
        }

        /* Page setup */
        @page {
          margin: 0.75in;
          size: letter;
        }
      }
    `}</style>
  );
}
