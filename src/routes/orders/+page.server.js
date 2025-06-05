import db from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  const user = locals.user;

  // Falls nicht eingeloggt → zum Login weiterleiten
  if (!user) {
    throw redirect(303, '/login'); 
  }

  // Bestellungen des aktuellen Benutzers laden
  const orders = await db.getOrdersByUser(user._id);
  return { orders };
}