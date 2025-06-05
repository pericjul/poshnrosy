<script>
  import BoxCard from "$lib/components/boxes/BoxCard.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  export let data;

  // Aktive Filterzustände
  let selectedTags = new Set();
  let selectedSize = 'all';
  let priceSort = 'none';

  // Alle verfügbaren Tags aus allen Boxen sammeln (einmalig)
  let availableTags = Array.from(
    new Set(data.boxes.flatMap(box => box.tags || []))
  ).sort();

  // Einzelnen Tag zum Filter hinzufügen oder entfernen
  function toggleTag(tag) {
    selectedTags = new Set(
      selectedTags.has(tag)
        ? Array.from(selectedTags).filter(t => t !== tag)
        : [...selectedTags, tag]
    );
  }

  // Gefilterte und sortierte Liste der Boxen
  $: filteredBoxes = data.boxes
    .filter(box => {
      const matchesTags =
        selectedTags.size === 0 || box.tags?.some(tag => selectedTags.has(tag));
      const matchesSize =
        selectedSize === 'all' || box.defaultOptions?.size === selectedSize;
      return matchesTags && matchesSize;
    })
    .sort((a, b) => {
      if (priceSort === 'asc') return a.price - b.price;
      if (priceSort === 'desc') return b.price - a.price;
      return 0;
    });
</script>

<h1 class="mb-4 text-center">Unsere Geschenkboxen</h1>

<!-- 🔍 Filterbereich -->
<section class="mb-4">
  <label class="form-label fw-bold">Filter nach Tags:</label>
  <div class="d-flex flex-wrap gap-2 mb-3">
    {#each availableTags as tag}
      <button
        type="button"
        class={`btn btn-sm ${selectedTags.has(tag) ? 'btn-dark' : 'btn-outline-secondary'}`}
        on:click={() => toggleTag(tag)}
      >
        {tag}
      </button>
    {/each}
  </div>

  <label class="form-label fw-bold me-2">Größe:</label>
  <select class="form-select w-auto d-inline-block me-4" bind:value={selectedSize}>
    <option value="all">Alle</option>
    <option value="S">S</option>
    <option value="M">M</option>
    <option value="L">L</option>
  </select>

  <label class="form-label fw-bold me-2">Sortierung:</label>
  <select class="form-select w-auto d-inline-block" bind:value={priceSort}>
    <option value="none">Keine</option>
    <option value="asc">Preis aufsteigend</option>
    <option value="desc">Preis absteigend</option>
  </select>
</section>

<!-- 🧺 Gefilterte Boxen anzeigen -->
<section>
  {#if filteredBoxes.length > 0}
    <div class="row row-cols-1 row-cols-md-3 g-4">
      {#each filteredBoxes as box}
        <div class="col">
          <BoxCard {box} />
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-center mt-4 text-muted">Keine passenden Boxen gefunden 🧐</p>
  {/if}
</section>