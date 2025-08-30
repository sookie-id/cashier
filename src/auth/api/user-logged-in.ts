import { getSession } from "../workflow/get-session";

export async function userLoggedIn() {
  return (await getSession()) != null;
}
