<script>
    export let data;
    import Footer from "$lib/components/layout/Footer.svelte";
  
    let orders = data.orders;
  </script>
  
  <div class="container my-5">
    <h1 class="mb-4 text-center">🌸 Meine Bestellungen</h1>
  
    {#if orders.length === 0}
      <!-- Info falls keine Bestellungen vorhanden -->
      <p class="text-center">Du hast noch keine Bestellungen aufgegeben.</p>
    {:else}
      <div class="order-list d-flex flex-column gap-4">
        {#each orders as order}
          <div class="card p-4 shadow-sm">
            <!-- Boxname + Button zur Box -->
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="mb-0">{order.boxName}</h5>
              <a href={`/boxes/${order.boxId}`} class="btn btn-outline-rosy btn-sm">Box ansehen</a>
            </div>
  
            <!-- Übersicht der gewählten Optionen -->
            <ul class="mb-3">
              <li><strong>Größe:</strong> {order.boxOptions.size}</li>
              <li><strong>Rosenfarbe:</strong> {order.boxOptions.roseColor}</li>
              <li><strong>Verpackung:</strong> {order.boxOptions.packaging}</li>
              {#if order.boxOptions.message}
                <li><strong>Nachricht:</strong> {order.boxOptions.message}</li>
              {/if}
            </ul>
  
            <!-- Adresse + Datum -->
            <p><strong>Lieferadresse:</strong><br>
              {order.name}, {order.address}, {order.zip} {order.city}
            </p>
  
            <p><strong>Bestelldatum:</strong> 
              {new Date(order.date).toLocaleDateString('de-CH', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </p>
          </div>
        {/each}
      </div>
    {/if}
  </div>