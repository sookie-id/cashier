import { fetchData } from "../persistence/fetch-data";

export async function getProducts() {
  return await fetchData("products");
}
