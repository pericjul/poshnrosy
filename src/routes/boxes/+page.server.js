import db from '$lib/server/db.js';
import { error as kitError } from '@sveltejs/kit';

export async function load() {
  try {
    // Holt alle Boxen aus der Datenbank
    const boxes = await db.getBoxes();

    // Falls das Ergebnis kein Array ist, Fehler werfen
    if (!Array.isArray(boxes)) {
      throw kitError(500, 'Fehler: Boxen-Daten sind ungültig');
    }

    // Boxen ans Frontend zurückgeben
    return { boxes };
  } catch (err) {
    console.error('Fehler beim Laden der Boxen:', err.message || err);
    throw kitError(500, 'Boxen konnten nicht geladen werden');
  }
}