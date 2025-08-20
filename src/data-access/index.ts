import { supabase } from "../shared/lib/supabaseClient";

export async function getProducts() {
  const { data } = await supabase.from("products").select();
  return data;
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}
