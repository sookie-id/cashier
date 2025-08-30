import { databaseClient } from "./database-client";

export async function getProducts() {
  const { data } = await databaseClient.from("products").select().order('id');
  return data;
}
