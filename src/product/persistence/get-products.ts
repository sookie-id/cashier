import { databaseClient } from "./database-client";
import type { Database } from "./database.types";

export async function getProducts(): Promise<Database['product']['Tables']['products']['Row'][] | null> {
  const { data } = await databaseClient.from("products").select().order('id');
  return data;
}
