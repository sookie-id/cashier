import { databaseWriteClient } from "./database-client";
import type { TableNames, TablesInsert } from "./database.types";

export async function insertData<T extends TableNames>(
  table: T,
  params: TablesInsert<T> | TablesInsert<T>[]
) {
  const { data } = await databaseWriteClient
    .from(table)
    .insert(params)
    .select();

  if (!data) {
    throw new Error(`Insert ${table} returned no rows`);
  }

  return data;
}
