import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let serverClient: SupabaseClient | null = null;
let browserClient: SupabaseClient | null = null;

/**
 * Server-side Supabase client using the service role key.
 * Use this in API routes only — never expose to the browser.
 */
export function createServerSupabaseClient(): SupabaseClient {
  if (serverClient) return serverClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables"
    );
  }

  serverClient = createClient(url, key, {
    auth: { persistSession: false },
  });

  return serverClient;
}

/**
 * Browser-side Supabase client using the anonymous key.
 * Used for read-only operations like fetching a proposal by ID on the view page.
 */
export function createBrowserSupabaseClient(): SupabaseClient {
  if (browserClient) return browserClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables"
    );
  }

  browserClient = createClient(url, key);

  return browserClient;
}
