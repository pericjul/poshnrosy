<script>
    // Die Liste aller Benutzer:innen wird als Prop übergeben
    export let users = [];
  
    // Felder für das Formular zum Erstellen neuer Benutzer:innen
    let username = "";
    let password = "";
    let role = "customer";
  </script>
  
  <div class="card p-4 shadow-sm mb-4">
    <h4 class="mb-3">👥 Kund:innen</h4>
  
    <!-- Existierende Benutzer:innen anzeigen -->
    <ul class="list-group mb-3">
      {#each users as user}
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>{user.username}</strong> ({user.role})<br />
            <small>{user.email}</small>
          </div>
          <!-- Button zum Löschen des jeweiligen Kontos -->
          <form method="POST">
            <input type="hidden" name="id" value={user._id} />
            <button type="submit" class="btn btn-outline-danger btn-sm" formaction="?/deleteUser">
              Loeschen
            </button>
          </form>
        </li>
      {/each}
    </ul>
  
    <!-- Formular zum Hinzufügen eines neuen Benutzerkontos -->
    <form method="POST">
      <h5 class="mb-3">➕ Neue Kundin / neuer Kunde</h5>
      <input
        type="text"
        name="username"
        bind:value={username}
        placeholder="Username"
        class="form-control mb-2"
        required
      />
      <input
        type="password"
        name="password"
        bind:value={password}
        placeholder="Passwort"
        class="form-control mb-2"
        required
      />
      <select name="role" bind:value={role} class="form-select mb-3">
        <option value="customer">Kund:in</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" class="btn btn-rosy w-100" formaction="?/createUser">Hinzufuegen</button>
    </form>
  </div>