import db from "$lib/server/db.js";
import { error } from "@sveltejs/kit";

export async function load({ params, locals }) {
  const box = await db.getBox(params.id);

  if (!box) {
    // Wenn keine Box mit der ID existiert, 404-Fehler auslösen
    throw error(404, "Box nicht gefunden");
  }

  // Falls keine Tags gespeichert sind, leeres Array setzen
  box.tags = box.tags ?? [];

  return {
    box,
    user: locals.user ?? null // User aus Session laden (falls vorhanden)
  };
}

export const actions = {
  edit: async ({ request, params, locals }) => {
    const user = locals.user;

    // Nur Admins dürfen Boxen bearbeiten
    if (!user || user.role !== "admin") {
      throw error(401, "Nicht autorisiert");
    }

    // Formulardaten lesen
    const data = await request.formData();
    const name = data.get("name");
    const description = data.get("description");
    const price = parseFloat(data.get("price"));
    const tagsRaw = data.get("tags") || "";

    const defaultSize = data.get("defaultSize");
    const defaultRoseColor = data.get("defaultRoseColor");
    const defaultPackaging = data.get("defaultPackaging");

    // Grundlegende Validierung
    if (!name || !description || isNaN(price)) {
      throw error(400, "Ungueltige Eingabedaten");
    }

    // Tags als Array aufbereiten
    const tags = tagsRaw
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    // Neues Box-Objekt zum Updaten
    const updatedBox = {
      name,
      description,
      price,
      tags,
      defaultOptions: {
        size: defaultSize,
        roseColor: defaultRoseColor,
        packaging: defaultPackaging
      }
    };

    // Update in DB ausführen
    await db.updateBox(params.id, updatedBox);

    return { success: true };
  }
};