// Lädt die eingeloggte Benutzerinfo aus der Session (falls vorhanden)
export async function load({ locals }) {
  return {
    user: locals.user ?? null
  };
}