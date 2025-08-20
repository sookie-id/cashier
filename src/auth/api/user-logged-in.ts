import { getSession } from "../persistence/get-session";

export async function userLoggedIn() {
  return (await getSession()) != null;
}
