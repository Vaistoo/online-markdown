<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronRightIcon, ChevronLeftIcon } from 'svelte-feather-icons';
	import Filestructure from './filestructure.svelte';
	import Menu from './menu.svelte';
	import { sidenavState } from './store/sidenav';

	let resize: boolean = false;
	let size: number = 250;

	let showMenu: boolean = false;

	$: {
		if (size > 0) {
			sidenavState.set(true);
		} else {
			sidenavState.set(false);
		}
	}

	onMount(() => {
		addEventListener('mousemove', (e) => {
			if (!resize) return;

			requestAnimationFrame(() => {
				if (e.clientX >= 0) {
					size = e.clientX;
				}

				if (e.clientX < 10) {
					size = 0;
				}
			});

			addEventListener('mouseup', () => {
				resize = false;
			});
		});
	});

	function toggleSideNav() {
		if (size === 0) {
			size = 250;
		} else {
			size = 0;
		}
	}
</script>

<div class="flex fixed h-screen z-[1000]" on:contextmenu|preventDefault={() => (showMenu = true)}>
	<div class="bg-zinc-800 overflow-x-hidden flex flex-col max-w-md" style="width: {size}px">
		<Filestructure />
	</div>
	<div class="w-2 bg-zinc-500" style="cursor: w-resize" on:mousedown={() => (resize = true)} />
</div>

<button
	class="absolute h-10 w-8 rounded-br-lg bg-zinc-500"
	style="transform: translateX({size > 0 ? size + 5 : 5}px)"
	on:click={() => toggleSideNav()}
>
	{#if size === 0}
		<ChevronRightIcon size="25" />
	{:else}
		<ChevronLeftIcon size="25" />
	{/if}
</button>

<Menu bind:showMenu />

<style lang="postcss">
</style>
