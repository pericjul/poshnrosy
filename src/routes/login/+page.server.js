import db from "$lib/server/db.js";
import { fail, redirect } from "@sveltejs/kit";
import bcryptjs from "bcryptjs";

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get("username");
    const password = data.get("password");

    // Passenden Benutzer in der Datenbank suchen
    const users = await db.getUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
      return fail(400, { error: "Benutzer nicht gefunden" });
    }

    // Passwort vergleichen
    const passwordCorrect = await bcryptjs.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return fail(400, { error: "Falsches Passwort" });
    }

    // ✅ Login erfolgreich – Session-Cookie setzen
    cookies.set("session_user", JSON.stringify({
      _id: user._id,
      username: user.username,
      role: user.role
    }), {
      path: "/",           // Cookie gilt für gesamte Seite
      httpOnly: true,      // Kein Zugriff via JavaScript
      sameSite: "strict",  // Kein Cross-Site-Zugriff
      maxAge: 60 * 60 * 24 // 1 Tag gültig
    });

    // Nach Login zurück zur Startseite
    throw redirect(303, "/");
  }
};