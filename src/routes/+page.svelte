<script>
	// Navigation verwenden, z. B. für "Jetzt entdecken"-Button
	import { goto } from '$app/navigation';
</script>

<!-- Hero-Bereich mit Bild, Overlay und Call-to-Action -->
<div class="hero-wrapper">
	<div class="hero position-relative text-center py-5">
		<div class="hero-overlay"></div>
		<div class="hero-content position-relative z-1 px-3">
			<h1 class="display-4 fw-bold mb-3" >Willkommen bei Posh & Rosy</h1>
			<p class="lead">Liebevoll handgemachte Geschenkboxen mit floraler Eleganz.</p>
			<button class="btn btn-rosy btn-lg mt-3" on:click={() => goto('/boxes')}>Jetzt entdecken</button>
		</div>
	</div>
</div>

<!-- Manuell ausgewählte Bestseller-Boxen -->
<div class="container my-5">
	<h2 class="text-center mb-4">Unsere beliebtesten Boxen</h2>
	<div class="row justify-content-center">
		<!-- Box 1 -->
		<div class="col-md-4 mb-4">
			<div class="card shadow-sm h-100">
				<img src="/blush-bloom.jpg" class="card-img-top" alt="Blush Bloom" />
				<div class="card-body text-center">
					<h5 class="card-title">Blush Bloom</h5>
					<a href="/boxes/1" class="btn btn-outline-rosy">Ansehen</a>
				</div>
			</div>
		</div>
		<!-- Box 2 -->
		<div class="col-md-4 mb-4">
			<div class="card shadow-sm h-100">
				<img src="/berry-love.jpg" class="card-img-top" alt="Berry Love" />
				<div class="card-body text-center">
					<h5 class="card-title">Berry Love</h5>
					<a href="/boxes/2" class="btn btn-outline-rosy">Ansehen</a>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Vorteilskommunikation -->
<div class="bg-light py-5">
	<div class="container text-center">
		<h2 class="mb-4">Warum Posh & Rosy?</h2>
		<ul class="list-unstyled fs-5">
			<li>🌹 Mit Liebe handgemacht</li>
			<li>🎁 Individuell anpassbar</li>
			<li>🚚 Schneller Versand in der Schweiz</li>
		</ul>
	</div>
</div>

<!-- Kundenstimmen -->
<section class="bg-white py-5 border-top">
	<div class="container">
		<h2 class="text-center mb-5">Das sagen unsere Kund:innen</h2>
		<div class="row justify-content-center">
			<!-- Testimonial 1 -->
			<div class="col-md-5 mb-4">
				<div class="testimonial-card p-4 h-100 shadow-sm rounded">
					<p class="mb-3">“So viel Liebe zum Detail – meine Schwester hat sich riesig gefreut!”</p>
					<p class="text-muted text-end">— Lea aus Zürich</p>
				</div>
			</div>
			<!-- Testimonial 2 -->
			<div class="col-md-5 mb-4">
				<div class="testimonial-card p-4 h-100 shadow-sm rounded">
					<p class="mb-3">“Wunderschön verpackt und perfekt als Geschenk – ich bestelle wieder!”</p>
					<p class="text-muted text-end">— Mira aus Bern</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Hero-Bereich auf volle Breite strecken */
	.hero-wrapper {
		width: 100vw;
		margin-left: calc(-1 * (100vw - 100%) / 2);
	}

	.hero {
		background-image: url('/hero.png');
		background-size: cover;
		background-position: center;
		color: white;
		min-height: 70vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		text-align: center;
		padding: 5rem 1rem;
	}

	/* halbtransparente Overlay-Schicht */
	.hero-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 0;
	}

	.hero-content {
		z-index: 1;
		max-width: 700px;
	}

	.card-img-top {
		height: 250px;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.card:hover .card-img-top {
		transform: scale(1.05);
	}

	.testimonial-card {
		background-color: #fafafa;
		border-left: 5px solid #e89cae;
	}

  .hero-content h1 {
  white-space: nowrap;
  font-size: 3rem;
}
</style>