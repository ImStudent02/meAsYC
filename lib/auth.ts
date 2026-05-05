// "use server";

import { cookies } from "next/headers";

export async function login(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.warn("ADMIN_PASSWORD is not set in environment variables.");
    return false;
  }

  if (password === adminPassword) {
    (await cookies()).set("admin_token", "authenticated", { 
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return true;
  }
  
  return false;
}

export async function logout(): Promise<void> {
  (await cookies()).delete("admin_token");
}
