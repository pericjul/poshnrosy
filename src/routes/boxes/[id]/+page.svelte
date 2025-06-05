<script>
  import { goto } from "$app/navigation";
  import Footer from "$lib/components/layout/Footer.svelte";
  export let data;

  let box = data.box;
  let user = data.user;
  let isAdmin = user?.role === "admin";
  let editMode = false;

  // Falls keine Tags gesetzt sind, leeres Array setzen
  box.tags = Array.isArray(box.tags) ? box.tags : [];

  // Konfiguration für individuelle Anpassung durch Kund:innen
  let customBox = {
    size: box.defaultOptions?.size || "M",
    roseColor: box.defaultOptions?.roseColor || "Rosa",
    packaging: box.defaultOptions?.packaging || "Klassisch",
    message: box.defaultOptions?.message || "",
  };

  // Für Admins: Werte zum Bearbeiten vorbefüllen
  let editableBox = {
    name: box.name,
    description: box.description,
    price: box.price,
    tags: box.tags.join(", "),
    defaultOptions: {
      size: box.defaultOptions?.size || "M",
      roseColor: box.defaultOptions?.roseColor || "Rosa",
      packaging: box.defaultOptions?.packaging || "Klassisch"
    }
  };

  // Weiterleitung zur Bestellseite mit aktuellen Optionen
  function proceedToOrder() {
    const query = new URLSearchParams(customBox).toString();
    goto(`/boxes/${box._id}/order?${query}`);
  }
</script>

<a href="/boxes" class="btn btn-outline-rosy mb-4">&larr; Zurück zur Übersicht</a>

<div class="container my-4">
  <div class="detail-container">
    <!-- Bild der Box -->
    <div class="image-box">
      <img src={box.imageUrl} alt={box.name} />
    </div>

    <!-- Detailtext / Bearbeitungsformular -->
    <div class="text-box">
      {#if isAdmin}
        <h1 class="mb-3">{!editMode ? box.name : 'Box bearbeiten'}</h1>

        {#if !editMode}
          <!-- Box-Infos für Admin im Lesemodus -->
          <button class="btn btn-outline-secondary mb-3" on:click={() => editMode = true}>Bearbeiten</button>
          <p class="lead">{box.description}</p>
          <p><strong>Preis:</strong> CHF {box.price.toFixed(2)}</p>
        {:else}
          <!-- Bearbeitungsformular für Admin -->
          <form method="POST" action="?/edit" class="mb-4">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input class="form-control" name="name" bind:value={editableBox.name} />
            </div>

            <div class="mb-3">
              <label class="form-label">Beschreibung</label>
              <textarea class="form-control" name="description" rows="3" bind:value={editableBox.description}></textarea>
            </div>

            <div class="mb-3">
              <label class="form-label">Preis (CHF)</label>
              <input type="number" class="form-control" name="price" bind:value={editableBox.price} step="0.1" />
            </div>

            <div class="mb-3">
              <label class="form-label">Tags (kommagetrennt)</label>
              <input class="form-control" name="tags" bind:value={editableBox.tags} />
            </div>

            <div class="mb-3">
              <label class="form-label">Standardgröße</label>
              <select name="defaultSize" class="form-select" bind:value={editableBox.defaultOptions.size}>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Standard-Rosenfarbe</label>
              <select name="defaultRoseColor" class="form-select" bind:value={editableBox.defaultOptions.roseColor}>
                <option value="Rosa">Rosa</option>
                <option value="Rot">Rot</option>
                <option value="Weiss">Weiss</option>
                <option value="Lila">Lila</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Standard-Verpackung</label>
              <select name="defaultPackaging" class="form-select" bind:value={editableBox.defaultOptions.packaging}>
                <option value="Klassisch">Klassisch</option>
                <option value="Elegant">Elegant</option>
                <option value="Verspielt">Verspielt</option>
              </select>
            </div>

            <button type="submit" class="btn btn-rosy">Speichern</button>
            <button type="button" class="btn btn-outline-secondary ms-2" on:click={() => editMode = false}>Abbrechen</button>
          </form>
        {/if}
      {:else}
        <!-- Kund:innenansicht -->
        <h1 class="mb-3">{box.name}</h1>

        {#if box.tags.length}
          <div class="mb-2 d-flex flex-wrap gap-2">
            {#each box.tags as tag}
              <span class="badge bg-secondary">{tag}</span>
            {/each}
          </div>
        {/if}

        <p class="lead">{box.description}</p>
        <p><strong>Preis:</strong> CHF {box.price.toFixed(2)}</p>

        <!-- Formular zur Auswahl der Optionen -->
        <form on:submit|preventDefault={proceedToOrder} class="mt-3">
          <div class="mb-3">
            <label class="form-label" for="size">Größe</label>
            <select id="size" class="form-select" bind:value={customBox.size}>
              <option value="S">Klein (S)</option>
              <option value="M">Mittel (M)</option>
              <option value="L">Gross (L)</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Rosenfarbe</label>
            <div class="d-flex gap-2 flex-wrap">
              {#each ["Rosa", "Rot", "Weiss", "Lila"] as color}
                <button
                  type="button"
                  class={`btn ${customBox.roseColor === color ? "btn-rosy" : "btn-outline-rosy"}`}
                  on:click={() => (customBox.roseColor = color)}
                >
                  {color}
                </button>
              {/each}
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Verpackungsstil</label>
            <div class="d-flex gap-2 flex-wrap">
              {#each ["Klassisch", "Elegant", "Verspielt"] as style}
                <button
                  type="button"
                  class={`btn ${customBox.packaging === style ? "btn-rosy" : "btn-outline-rosy"}`}
                  on:click={() => (customBox.packaging = style)}
                >
                  {style}
                </button>
              {/each}
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label" for="message">Persönliche Nachricht</label>
            <textarea
              id="message"
              class="form-control"
              rows="3"
              placeholder="Optional"
              bind:value={customBox.message}
            ></textarea>
          </div>

          <button type="submit" class="btn btn-rosy">Bestellen</button>
        </form>
      {/if}
    </div>
  </div>
</div>

<style>
  .detail-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
    margin-top: 2rem;
    flex-wrap: wrap;
  }

  .image-box {
    flex: 0 0 400px;
  }

  .image-box img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  .text-box {
    flex: 1;
    min-width: 300px;
  }
</style>