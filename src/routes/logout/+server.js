import { redirect } from "@sveltejs/kit";

export async function GET({ cookies }) {
  // Session-Cookie löschen (Benutzer wird ausgeloggt)
  cookies.delete("session_user", { path: "/" });

  // Zur Startseite weiterleiten
  throw redirect(303, "/");
}