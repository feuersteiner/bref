<script lang="ts">
	import { asset } from '$app/paths';
</script>

<div class="logo">
	<div class="icon">
		<img src={asset('/favicon.svg')} alt="Logo" />
		<span>Bref</span>
	</div>

	<p>A truly Svelte-esque UI Component Library.</p>
</div>

<style>
	div {
		display: flex;
		gap: 1rem;
	}
	.icon {
		align-items: center;
	}
	.logo {
		padding: 1rem;
		flex-direction: column;
		width: 100%;
		height: fit-content;
		background-color: color-mix(in srgb, var(--color-foreground) 5%, transparent);
	}
	span {
		font-size: 2rem;
		font-family: 'Meow Script', cursive;
	}
	p {
		font-size: 0.75rem;
		opacity: 0.7;
		font-weight: 300;
	}
	img {
		width: 3rem;
		height: 3rem;
	}
</style>
