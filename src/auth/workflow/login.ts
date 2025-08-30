import { authClient } from "../persistence/auth-client";

export async function login(email: string, password: string) {
  const { data, error } = await authClient.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}
