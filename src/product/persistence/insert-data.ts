import { databaseWriteClient } from "./database-client";
import type { TableNames, TablesInsert } from "./database.types";

export async function insertData<T extends TableNames>(
  table: T,
  params: TablesInsert<T>
): Promise<number> {
  const { data } = await databaseWriteClient
    .from(table)
    .insert(params)
    .select();
  return data?.[0]?.id;
}
