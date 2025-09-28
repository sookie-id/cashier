import { databaseClient } from "./database-client";
import type { Database } from "./database.types";

export async function insertData<T extends keyof Database["product"]["Tables"]>(
  table: T,
  params: Database["product"]["Tables"][T]["Insert"]
): Promise<number | undefined> {
  const { data } = await databaseClient
    .from(table)
    .insert(params)
    .select();
  return data?.[0]?.id;
}
