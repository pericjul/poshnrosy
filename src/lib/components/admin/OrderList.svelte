<script>
    // Die Bestellungen werden als Prop übergeben
    export let orders = [];
  </script>
  
  <div class="card p-4 shadow-sm">
    <h4 class="mb-3">📦 Bestellungen</h4>
  
    <ul class="list-group">
      {#each orders as order}
        <li class="list-group-item">
          <!-- Bestellung mit ID und Box-Name -->
          <strong>#{order._id}</strong> – <em>{order.boxName}</em><br />
  
          <!-- Benutzername (Gast, falls nicht eingeloggt) -->
          Von: {order.userName ?? "Gast"}<br />
  
          <!-- Datum formatiert im Schweizer Format -->
          <small>{new Date(order.date).toLocaleString("de-CH")}</small>
        </li>
      {/each}
    </ul>
  </div>