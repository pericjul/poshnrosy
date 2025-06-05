<script>
  // Prop "box" mit erwarteten Eigenschaften (für Type-Hints)
  /** @type {{ _id: number|string, name: string, description: string, price: number, imageUrl: string }} */
  export let box;
</script>

<div class="card h-100 shadow-sm border-0 rounded overflow-hidden">
  <!-- Bild mit Overlay-Effekt -->
  <div class="image-container">
    <img src={box.imageUrl} alt={box.name} class="card-img-top" />
    <div class="overlay">
      <h5 class="card-title mb-1">{box.name}</h5>
      <p class="card-text small">{box.description}</p>
    </div>
  </div>

  <!-- Preis und Link zur Detailseite -->
  <div class="card-body d-flex justify-content-between align-items-end pt-2">
    <strong>CHF {box.price.toFixed(2)}</strong>
    <a href={`/boxes/${box._id}`} class="btn btn-pink btn-sm">Ansehen</a>
  </div>
</div>

<style>
  /* Bildbereich mit Hover-Zoom */
  .image-container {
    position: relative;
    height: 240px;
    overflow: hidden;
  }

  .card-img-top {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .card:hover .card-img-top {
    transform: scale(1.05);
  }

  /* Overlay mit Verlauf und Text */
  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 80%);
    color: white;
    padding: 1rem;
  }

  .card-title,
  .card-text {
    margin: 0;
    color: white;
  }

  /* Card-Hover-Effekt */
  .card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .card:hover {
    transform: scale(1.015);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  /* Benutzerdefinierte pinke Button-Styles */
  .btn-pink {
    background-color: #f3b6c0;
    border-color: #f3b6c0;
    color: white;
  }

  .btn-pink:hover {
    background-color: #e79aa9;
    border-color: #e79aa9;
  }
</style>