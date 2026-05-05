// Supabase client - creates a browser-side client to talk to our database
// Handles gracefully when credentials aren't configured yet
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Check if supabase is properly configured before creating client
export const isSupabaseConfigured = () => {
  return (
    supabaseUrl !== "" &&
    supabaseUrl !== "your_supabase_url_here" &&
    supabaseAnonKey !== "" &&
    supabaseAnonKey !== "your_supabase_anon_key_here" &&
    (supabaseUrl.startsWith("http://") || supabaseUrl.startsWith("https://"))
  );
};

// Only create real client if configured, otherwise use a dummy placeholder
// This prevents build errors when Supabase isn't set up yet
let supabase: SupabaseClient;

if (isSupabaseConfigured()) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Dummy client that won't crash - all calls will fail gracefully
  // and our data.ts will fall back to mock data
  supabase = createClient("https://placeholder.supabase.co", "placeholder-key");
}

export { supabase };
