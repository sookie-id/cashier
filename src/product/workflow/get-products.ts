import { fetchData } from "../persistence/fetch-data";

export type Product = NonNullable<
  Awaited<ReturnType<typeof getProducts>>
>[number];

export async function getProducts() {
  return await fetchData("products");
}
