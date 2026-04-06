"use client";

import { useState, useEffect } from "react";

/**
 * Client-side spam protection hook
 *
 * Returns:
 * - honeypot: value of hidden field (should stay empty)
 * - setHoneypot: setter for the hidden field
 * - formLoadedAt: timestamp when the form rendered
 * - spamFields: object to spread into fetch body
 */
export function useSpamProtection() {
  const [honeypot, setHoneypot] = useState("");
  const [formLoadedAt, setFormLoadedAt] = useState(0);

  useEffect(() => {
    setFormLoadedAt(Date.now());
  }, []);

  return {
    honeypot,
    setHoneypot,
    formLoadedAt,
    spamFields: {
      _hp: honeypot, // honeypot value
      _t: formLoadedAt, // timestamp
    },
  };
}
