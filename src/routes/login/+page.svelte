<script>
  export let form;
  import Footer from "$lib/components/layout/Footer.svelte";
</script>

<div class="container-sm mt-5" style="max-width: 400px;">
  <h1 class="text-center mb-4">Login</h1>

  {#if form?.error}
    <!-- Fehlermeldung bei ungültigen Login-Daten -->
    <div class="alert alert-danger text-center">{form.error}</div>
  {/if}

  <form method="POST" class="border p-4 rounded bg-white shadow-sm">
    <div class="mb-3">
      <label for="username" class="form-label">Benutzername</label>
      <input
        type="text"
        class="form-control"
        name="username"
        id="username"
        required
      />
    </div>

    <div class="mb-3">
      <label for="password" class="form-label">Passwort</label>
      <input
        type="password"
        class="form-control"
        name="password"
        id="password"
        required
      />
    </div>

    <!-- Absenden des Formulars -->
    <button type="submit" class="btn btn-rosy w-100">Einloggen</button>
  </form>
</div>