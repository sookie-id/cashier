import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const databaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    db: {
        schema: "product" as any
    }
});