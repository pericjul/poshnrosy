import db from "$lib/server/db.js";
import { redirect, error } from "@sveltejs/kit";

// Lädt die aktuelle Box anhand der ID aus der URL
export async function load({ params }) {
  const box = await db.getBox(params.id);

  if (!box) {
    // Falls keine Box gefunden wurde, Fehler anzeigen
    throw error(404, "Box nicht gefunden");
  }

  return { box };
}

// Wird aufgerufen, wenn das Bestellformular abgesendet wird
export const actions = {
  default: async ({ request, params, locals }) => {
    const form = await request.formData();

    // Session-Daten holen (User aus Cookie)
    const user = locals.user;
    const userId = user?._id ? Number(user._id) : null;
    const userName = user?.username ?? "Gast"; // Falls kein Login, dann als "Gast"

    // Bestellobjekt mit allen relevanten Infos
    const order = {
      userId,
      userName,
      boxId: Number(params.id),
      boxName: form.get("boxName"),
      boxOptions: {
        size: form.get("size"),
        roseColor: form.get("roseColor"),
        packaging: form.get("packaging"),
        message: form.get("message")
      },
      name: form.get("name"),
      address: form.get("address"),
      zip: form.get("zip"),
      city: form.get("city"),
      email: form.get("email"),
      paymentMethod: "Rechnung", // Fix gesetzt
      date: new Date()
    };

    // Bestellung in der Datenbank speichern
    await db.createOrder(order);

    // Nach erfolgreicher Bestellung zur Danke-Seite weiterleiten
    throw redirect(303, `/boxes/${params.id}/order/thank-you`);
  }
};