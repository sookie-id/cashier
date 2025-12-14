import { databaseWriteClient } from "./database-client";
import type { TablesUpdate } from "./database.types";

export async function updateProduct(
  product: TablesUpdate<"products">
): Promise<void> {
  product.updated_at = new Date().toISOString();
  await databaseWriteClient
    .from("products")
    .update(product)
    .eq("id", product.id);
}
