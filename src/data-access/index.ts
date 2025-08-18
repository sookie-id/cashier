import { supabase } from "./supabaseClient";

export async function getProducts() {
  const { data } = await supabase.from("products").select();
  return data;
}
