import { databaseWriteClient } from "./database-client";
import type { TableNames, TablesUpdate } from "./database.types";

export async function updateByID<T extends TableNames>(
  table: T,
  data: TablesUpdate<T> & { id: number }
): Promise<void> {
  data.updated_at = new Date().toISOString();
  await databaseWriteClient
    .from(table)
    .update(data)
    .eq("id", data.id);
}
