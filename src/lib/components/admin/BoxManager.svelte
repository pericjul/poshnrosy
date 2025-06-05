<script>
    // Die bestehenden Boxen werden als Prop übergeben
    export let boxes = [];
  
    // Lokale Variablen für das Formular zum Erstellen einer neuen Box
    let name = "";
    let description = "";
    let price = "";
    let tags = "";
    let defaultSize = "M";
    let defaultRoseColor = "Rosa";
    let defaultPackaging = "Klassisch";
  </script>
  
  <div class="card p-4 shadow-sm">
    <h4 class="mb-3">🎁 Boxen verwalten</h4>
  
    <!-- Liste der vorhandenen Boxen -->
    <ul class="list-group mb-4">
      {#each boxes as box}
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>{box.name}</strong><br />
            <small>{box.price} CHF – {box.defaultOptions?.size}</small>
          </div>
          <div class="btn-group">
            <!-- Link zur Detailansicht der Box -->
            <a class="btn btn-outline-secondary btn-sm" href={`/boxes/${box._id}`}>Ansehen</a>
  
            <!-- Formular zum Loeschen der Box (per POST mit eigener Action) -->
            <form method="POST">
              <input type="hidden" name="id" value={box._id} />
              <button
                type="submit"
                class="btn btn-outline-danger btn-sm"
                formaction="?/deleteBox"
              >
                Loeschen
              </button>
            </form>
          </div>
        </li>
      {/each}
    </ul>
  
    <!-- Formular zum Hinzufuegen einer neuen Box -->
    <form method="POST" enctype="multipart/form-data">
      <h5 class="mb-3">➕ Neue Box erstellen</h5>
  
      <!-- Basisinformationen -->
      <input
        type="text"
        name="name"
        bind:value={name}
        placeholder="Boxname"
        class="form-control mb-2"
        required
      />
      <textarea
        name="description"
        bind:value={description}
        placeholder="Beschreibung"
        class="form-control mb-2"
        required
      ></textarea>
      <input
        type="number"
        name="price"
        bind:value={price}
        step="0.1"
        placeholder="Preis in CHF"
        class="form-control mb-2"
        required
      />
  
      <!-- Tags werden als kommagetrennte Liste gespeichert -->
      <input
        type="text"
        name="tags"
        bind:value={tags}
        placeholder="Tags (kommagetrennt)"
        class="form-control mb-3"
      />
  
      <!-- Standardoptionen für Groesse, Farbe, Verpackung -->
      <h6 class="mt-3">Standard-Optionen</h6>
  
      <select name="defaultSize" bind:value={defaultSize} class="form-select mb-2">
        <option value="S">Groesse: S</option>
        <option value="M">Groesse: M</option>
        <option value="L">Groesse: L</option>
      </select>
  
      <select name="defaultRoseColor" bind:value={defaultRoseColor} class="form-select mb-2">
        <option value="Rosa">Rosa</option>
        <option value="Rot">Rot</option>
        <option value="Weiss">Weiss</option>
        <option value="Lila">Lila</option>
      </select>
  
      <select name="defaultPackaging" bind:value={defaultPackaging} class="form-select mb-3">
        <option value="Klassisch">Klassisch</option>
        <option value="Elegant">Elegant</option>
        <option value="Verspielt">Verspielt</option>
      </select>
  
      <!-- Absenden an die createBox-Action -->
      <button type="submit" class="btn btn-rosy w-100" formaction="?/createBox">
        Box hinzufuegen
      </button>
    </form>
  </div>