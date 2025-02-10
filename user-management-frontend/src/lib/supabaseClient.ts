/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing. Check .env.local.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to test connection (use it in a component)
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from("clients").select("*");
    if (error) {
      console.error("Supabase Error:", error);
    } else {
      console.log("Supabase Data:", data);
    }
  } catch (err) {
    console.error("Unexpected Error:", err);
  }
};
