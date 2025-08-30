import { databaseClient } from "./database-client";
import type { Database } from "./database.types";

export async function insertProduct(product: Database['product']['Tables']['products']['Insert']) {
  const { data } = await databaseClient.from("products").insert(product);
  return data;
}
