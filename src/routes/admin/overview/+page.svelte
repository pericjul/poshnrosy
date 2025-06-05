<script>
  // Daten werden vom Server über das `load`-Funktion geladen
  export let data;

  // Komponenten für die Admin-Seite importieren
  import BoxManager from '$lib/components/admin/BoxManager.svelte';
  import UserManager from '$lib/components/admin/UserManager.svelte';
  import OrderList from '$lib/components/admin/OrderList.svelte';
</script>

<div class="container my-5">
  <div class="row g-4">
    <!-- Linke Spalte: Box-Verwaltung -->
    <div class="col-md-6">
      <BoxManager boxes={data.boxes} />
    </div>

    <!-- Rechte Spalte: Benutzer:innen- und Bestellverwaltung -->
    <div class="col-md-6">
      <UserManager users={data.users} />
      <OrderList orders={data.orders} />
    </div>
  </div>
</div>