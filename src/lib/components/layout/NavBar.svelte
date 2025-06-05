<script>
    // Zugriff auf aktuelle Page-Daten, inkl. eingeloggtem Benutzer
    import { page } from '$app/stores';
  
    // Icons aus lucide-svelte
    import {
      Home,
      Gift,
      UserCog,
      LogOut,
      LogIn,
      ClipboardList
    } from 'lucide-svelte';
  
    // Reaktive Ableitung des eingeloggten Benutzers aus Page-Daten
    $: user = $page.data.user;
  </script>
  
  <!-- Haupt-Header der Seite -->
  <header class="header">
    <!-- Logo-Bereich mit Verlinkung zur Startseite -->
    <div class="logo">
      <a href="/">
        <img src="/logo.jpeg" alt="Poshnrosy" />
      </a>
    </div>
  
    <!-- Zentrale Navigation, variiert je nach Benutzerrolle -->
    <nav class="center-nav">
      <a href="/"><Home size={18}/>Startseite</a>
      <a href="/boxes"><Gift size={18}/>Boxen</a>
  
      {#if user?.role === 'customer'}
        <a href="/orders"><ClipboardList size={18}/>Bestellungen</a>
      {/if}
  
      {#if user?.role === 'admin'}
        <a href="/admin/overview"><UserCog size={18}/>Admin</a>
      {/if}
    </nav>
  
    <!-- Benutzerbereich rechts im Header -->
    <div class="user-nav">
      {#if user}
        <span>Hallo, {user.username}</span>
        <a href="/logout"><LogOut size={18}/>Logout</a>
      {:else}
        <a href="/login"><LogIn size={18}/>Login</a>
      {/if}
    </div>
  </header>
  
  <style>
    .header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 1rem 2rem;
      border-bottom: 1px solid #ddd;
      background-color: white;
      gap: 3rem;
    }
  
    .logo {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  
    .logo img {
      height: 60px;
    }
  
    .center-nav {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
  
    .user-nav {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-left: auto;
    }
  
    .center-nav a,
    .user-nav a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  
    .center-nav a:hover,
    .user-nav a:hover {
      color: #d63384;
    }
  </style>