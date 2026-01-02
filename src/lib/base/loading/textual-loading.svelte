<script lang="ts">
	import type { TextualLoadingProps } from './types.ts';

	const DEFAULT_WORDS = [
		'Thinking',
		'Brewing',
		'Conjuring',
		'Pondering',
		'Crunching',
		'Fetching',
		'Spinning',
		'Warming',
		'Polishing',
		'Shuffling',
		'Wiggling',
		'Stretching',
		'Juggling',
		'Wrangling',
		'Herding',
		'Tickling',
		'Poking',
		'Nudging',
		'Summoning',
		'Manifesting'
	];

	const {
		size = 'medium',
		color = 'primary',
		words = DEFAULT_WORDS,
		hideDots = false,
		typeSpeed = 'normal',
		pauseSpeed = 'normal'
	}: TextualLoadingProps = $props();

	const TYPE_MS = { slow: 100, normal: 50, fast: 25 } as const;
	const PAUSE_MS = { slow: 800, normal: 500, fast: 300 } as const;

	let leftPart = $state('');
	let rightPart = $state('');
	let showCursor = $state(true);

	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	const typeWord = async (word: string, prev: string) => {
		const target = hideDots ? word : word + '...';
		const maxLen = Math.max(target.length, prev.length);
		const ms = TYPE_MS[typeSpeed];

		for (let i = 0; i <= maxLen; i++) {
			leftPart = target.slice(0, i);
			rightPart = prev.slice(i + 1);
			await sleep(ms);
		}

		leftPart = target;
		rightPart = '';
	};

	$effect(() => {
		let cancelled = false;

		const animate = async () => {
			let index = 0;
			let prev = '';

			while (!cancelled) {
				const word = words[index];

				showCursor = true;
				await typeWord(word, prev);

				await sleep(TYPE_MS[typeSpeed]);
				showCursor = false;

				await sleep(PAUSE_MS[pauseSpeed]);

				prev = hideDots ? word : word + '...';
				index = (index + 1) % words.length;
			}
		};

		animate();

		return () => {
			cancelled = true;
		};
	});
</script>

<span class={`${size} ${color}`} role="status" aria-label="Loading">
	{leftPart}{#if showCursor}<span class="cursor">▌</span>{/if}{rightPart}
</span>

<style>
	span {
		--internal-font-size: 1rem;

		font-size: var(--internal-font-size);
		color: var(--internal-current-color);
		font-weight: 500;
	}

	.cursor {
		animation: blink 0.7s step-end infinite;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}

	/* Sizes */
	.x-small {
		--internal-font-size: 0.75rem;
	}

	.small {
		--internal-font-size: 0.875rem;
	}

	.medium {
		--internal-font-size: 1rem;
	}

	.large {
		--internal-font-size: 1.125rem;
	}

	.x-large {
		--internal-font-size: 1.25rem;
	}

	/* Color mappings */
	.primary {
		--internal-current-color: var(--color-primary);
	}

	.secondary {
		--internal-current-color: var(--color-secondary);
	}

	.success {
		--internal-current-color: var(--color-success);
	}

	.warning {
		--internal-current-color: var(--color-warning);
	}

	.danger {
		--internal-current-color: var(--color-danger);
	}

	.info {
		--internal-current-color: var(--color-info);
	}

	.foreground {
		--internal-current-color: var(--color-foreground);
	}

	.background {
		--internal-current-color: var(--color-background);
	}
</style>
