import { databaseReadClient } from "./database-client";
import type { TableNames, Tables } from "./database.types";

type PickColumns<
  Row,
  Column extends readonly (keyof Row)[] | undefined,
> = Column extends readonly (keyof Row)[] ? Pick<Row, Column[number]> : Row;

type FetchDataReturn<Row, Column extends readonly (keyof Row)[] | undefined> =
  | PickColumns<Row, Column>[]
  | null;

export async function fetchData<
  Table extends TableNames,
  Row extends Tables<Table>,
  Column extends Extract<keyof Row, string>[] | undefined = undefined,
>(
  table: Table,
  {
    filter,
    order = { column: "id" as Extract<keyof Row, string>, ascending: true },
    columns,
  }: {
    filter?: Partial<Row>;
    order?: {
      column: Extract<keyof Row, string>;
      ascending: boolean;
    };
    columns?: Column;
  } = {}
): Promise<FetchDataReturn<Row, Column>> {
  let selectParams = columns && columns.length > 0 ? columns.join(",") : "*";

  let selectQuery = databaseReadClient
    .from(table)
    .select(selectParams)
    .order(order.column, { ascending: order.ascending });

  if (filter) {
    Object.entries(filter).forEach(([column, value]) => {
      selectQuery = selectQuery.eq(column, value);
    });
  }
  const { data } = await selectQuery;

  return data as FetchDataReturn<Row, Column>;
}
