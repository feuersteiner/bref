<script lang="ts">
	import Theme from '../src/lib/base/theme/theme.svelte';
	import Button from '../src/lib/base/button/button.svelte';
	import IconButton from '../src/lib/base/button/icon-button.svelte';
	import { COLOR_VALUES, type Color, type Variant } from '../src/lib/base/types.ts';

	const variants: Variant[] = ['filled', 'soft', 'ghost'];
	const fixtures = COLOR_VALUES.flatMap((color) =>
		variants.flatMap((variant) =>
			[false, true].flatMap((disabled) => [
				{ component: 'Button' as const, color, variant, disabled },
				{ component: 'IconButton' as const, color, variant, disabled }
			])
		)
	);

	function fixtureId(component: string, color: Color, variant: Variant, disabled: boolean) {
		return `${component}-${color}-${variant}-${disabled ? 'disabled' : 'enabled'}`;
	}
</script>

<Theme>
	<div class="fixtures">
		{#each fixtures as fixture (fixtureId(fixture.component, fixture.color, fixture.variant, fixture.disabled))}
			{#if fixture.component === 'Button'}
				<Button
					id={fixtureId(fixture.component, fixture.color, fixture.variant, fixture.disabled)}
					label={fixture.color}
					icon={{ name: 'add' }}
					color={fixture.color}
					variant={fixture.variant}
					disabled={fixture.disabled}
				/>
			{:else}
				<IconButton
					id={fixtureId(fixture.component, fixture.color, fixture.variant, fixture.disabled)}
					name="favorite"
					ariaLabel={fixture.color}
					color={fixture.color}
					variant={fixture.variant}
					disabled={fixture.disabled}
				/>
			{/if}
		{/each}
	</div>
</Theme>

<style>
	:global(*) {
		transition: none !important;
	}

	.fixtures {
		display: grid;
		grid-template-columns: repeat(6, max-content);
		gap: 1rem;
		padding: 2rem;
	}
</style>
