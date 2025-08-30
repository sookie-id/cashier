import { authClient } from "../persistence/auth-client";

export async function getSession() {
  const { data } = await authClient.getSession();
  return data.session;
}
