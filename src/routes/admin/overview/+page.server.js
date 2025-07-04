import db from '$lib/server/db.js';
import bcrypt from 'bcryptjs';

// Lädt alle benötigten Daten (Boxen, Bestellungen, Benutzer:innen) parallel
export async function load() {
  const [boxes, orders, users] = await Promise.all([
    db.getBoxes(),
    db.getOrders(),
    db.getUsers()
  ]);

  return { boxes, orders, users };
}

// Definiert alle Formular-Aktionen (löschen/erstellen)
export const actions = {
  // Benutzer:in löschen
  deleteUser: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');

    if (id) {
      console.log('Benutzer löschen:', id);
      await db.deleteUser(id);
    }
  },

  // Box löschen
  deleteBox: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');

    if (id) {
      console.log('🗑️ Box löschen:', id);
      await db.deleteBox(id);
    }
  },

  // Neue Box anlegen
  createBox: async ({ request }) => {
    const data = await request.formData();

    // Eingabewerte auslesen
    const name = data.get('name');
    const price = parseFloat(data.get('price'));
    const description = data.get('description') ?? '';
    const tags = (data.get('tags') ?? '')
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean); // leere Tags entfernen

    // Standardoptionen für die Box
    const defaultOptions = {
      size: data.get('defaultSize') ?? 'M',
      roseColor: data.get('defaultRoseColor') ?? 'Rosa',
      packaging: data.get('defaultPackaging') ?? 'Klassisch',
      message: ''
    };

    // Statt Bild hochladen: Platzhalter-Bild verwenden
    const imageUrl = '/images/placeholder.jpg'; // Stelle sicher, dass dieses Bild in static/images liegt

    // Nur speichern, wenn alles gültig
    if (name && !isNaN(price)) {
      await db.createBox({ name, description, price, imageUrl, tags, defaultOptions });
      console.log('Neue Box erstellt:', name);
    }
  },

  // Neues Benutzerkonto anlegen
  createUser: async ({ request }) => {
    const data = await request.formData();

    const username = data.get('username');
    const password = data.get('password');
    const role = data.get('role');

    if (!username || !password || !role) return;

    const passwordHash = await bcrypt.hash(password, 12); // Passwort verschlüsseln
    await db.createUser({ username, passwordHash, role });
    console.log('Neuer User erstellt:', username);
  }
};