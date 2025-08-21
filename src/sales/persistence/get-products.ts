import { supabase } from "../../shared/lib/supabase";

export async function getProducts() {
  const { data } = await supabase.from("products").select();
  return data;
}
