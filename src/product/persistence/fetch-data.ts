import { databaseClient } from "./database-client";
import type { Database } from "./database.types";

export async function fetchData<T extends keyof Database["product"]["Tables"]>({
  table,
  filter,
  order = { column: "id", ascending: true },
}: {
  table: T;
  filter?: Database["product"]["Tables"][T]["Row"];
  order?: {
    column: keyof Database["product"]["Tables"][T]["Row"] & string;
    ascending: boolean;
  };
}): Promise<Database["product"]["Tables"]["products"]["Row"][] | null> {
  let selectQuery = databaseClient
    .from(table)
    .select()
    .order(order.column, { ascending: order.ascending });

  if (filter) {
    Object.entries(filter).forEach(([column, value]) => {
      selectQuery = selectQuery.eq(column, value);
    });
  }
  const { data } = await selectQuery;

  return data;
}
