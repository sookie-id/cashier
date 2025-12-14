import { databaseWriteClient } from "./database-client";
import type { Database, TablesInsert } from "./database.types";

export async function insertData<T extends keyof Database["product"]["Tables"]>(
  table: T,
  params: TablesInsert<T>
): Promise<number> {
  const { data } = await databaseWriteClient
    .from(table)
    .insert(params)
    .select();
  return data?.[0]?.id;
}
