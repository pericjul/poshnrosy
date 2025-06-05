<script>
	// Globale Layout-Komponenten einbinden
	import Navbar from '$lib/components/layout/NavBar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	// Globale CSS-Datei importieren
	import '../styles/global.css';
</script>

<!-- Navigation oben -->
<Navbar />

<main>
	<!-- Hier wird der jeweilige Seiteninhalt eingebettet -->
	<slot />
</main>

<!-- Footer unten -->
<Footer />