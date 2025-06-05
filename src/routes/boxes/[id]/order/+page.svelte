<script>
  export let data;
  const box = data.box; // Die ausgewählte Box wird aus dem Server-Load geladen
</script>

<!-- Zurück-Button zur Boxübersicht -->
<a href="/boxes" class="btn btn-outline-rosy mb-4">&larr; Zurueck</a>

<div class="container">
  <h1 class="mb-4">Deine Bestellung: <strong>{box.name}</strong></h1>

  <!-- Anzeige der vorausgewählten Box-Optionen -->
  <div class="card p-4 mb-4">
    <h5>Ausgewaehlte Optionen:</h5>
    <ul class="mb-0">
      <li><strong>Groesse:</strong> {box.defaultOptions.size}</li>
      <li><strong>Rosenfarbe:</strong> {box.defaultOptions.roseColor}</li>
      <li><strong>Verpackung:</strong> {box.defaultOptions.packaging}</li>
      <li><strong>Nachricht:</strong> {box.defaultOptions.message || 'Keine'}</li>
    </ul>
  </div>

  <!-- Bestellformular -->
  <form method="POST">
    <!-- Diese versteckten Felder werden mitgeschickt, damit der Server alles zur Box weiss -->
    <input type="hidden" name="boxName" value={box.name} />
    <input type="hidden" name="size" value={box.defaultOptions.size} />
    <input type="hidden" name="roseColor" value={box.defaultOptions.roseColor} />
    <input type="hidden" name="packaging" value={box.defaultOptions.packaging} />
    <input type="hidden" name="message" value={box.defaultOptions.message} />

    <!-- Eingabe der Lieferadresse -->
    <h4 class="mt-4">Lieferadresse</h4>

    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input id="name" name="name" class="form-control" required />
    </div>

    <div class="mb-3">
      <label for="address" class="form-label">Adresse</label>
      <input id="address" name="address" class="form-control" required />
    </div>

    <div class="row mb-3">
      <div class="col-md-4">
        <label for="zip" class="form-label">PLZ</label>
        <input id="zip" name="zip" class="form-control" required />
      </div>
      <div class="col-md-8">
        <label for="city" class="form-label">Ort</label>
        <input id="city" name="city" class="form-control" required />
      </div>
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">E-Mail (fuer Rechnung)</label>
      <input id="email" name="email" type="email" class="form-control" required />
    </div>

    <!-- Hinweis zur fixen Bezahlmethode -->
    <div class="alert alert-rosy">
      Bezahlart: <strong>Rechnung</strong>
    </div>

    <!-- Absenden der Bestellung -->
    <button type="submit" class="btn btn-rosy">Bestellung abschicken</button>
  </form>
</div>