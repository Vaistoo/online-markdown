<script lang="ts">
	import { onMount } from 'svelte';
	import {
		ChevronRightIcon,
		ChevronLeftIcon,
		FolderPlusIcon,
		FilePlusIcon
	} from 'svelte-feather-icons';
	import Filestructure from './filestructure.svelte';
	import Menu from './menu.svelte';
	import { iconSize } from './store/iconSize';
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
	<div
		class="bg-zinc-800 overflow-x-hidden flex flex-col justify-between max-w-md"
		style="width: {size}px"
	>
		<Filestructure />

		<div class="sm:hidden flex flex-col items-center justify-center py-4 mx-4">
			<button class="add-node-button mb-4">
				<FolderPlusIcon size={$iconSize} class="icon" />
				add folder
			</button>
			<button class="add-node-button">
				<FilePlusIcon size={$iconSize} class="icon" />
				add file
			</button>
		</div>
	</div>
	<div class="resize-toggle" style="cursor: w-resize" on:mousedown={() => (resize = true)} />
</div>

<button
	class="open-sidenav-button"
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
	.resize-toggle {
		@apply w-2 bg-zinc-500;
	}
	.open-sidenav-button {
		@apply fixed flex items-center justify-center bg-zinc-500;
		@apply h-14 sm:h-10 w-14 sm:w-8 rounded-br-lg;
	}
	.add-node-button {
		@apply bg-orange-800 hover:bg-orange-700;
		@apply flex items-center w-full;
		@apply rounded-lg py-4 shadow-xl;
	}
</style>
