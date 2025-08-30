import { databaseClient } from "./database-client";
import type { Database } from "./database.types";

export async function updateProduct(product: Database['product']['Tables']['products']['Update']) {
  product.updated_at = new Date().toISOString();
  const { data } = await databaseClient.from("products").update(product).eq('id', product.id);
  return data;
}