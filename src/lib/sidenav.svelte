<script lang="ts">
	import { onMount } from 'svelte';

	import Folder from './folder.svelte';
	import contextMenuOutside from './helpers/contextMenuOutside';
	import Menu from './menu.svelte';

	import { notes } from './store/notes';

	let resize: boolean = false;
	let size: number = 250;

	let showMenu: boolean = false;

	onMount(() => {
		addEventListener('mousemove', (e) => {
			if (!resize) return;

			requestAnimationFrame(() => {
				size = e.clientX;
			});

			addEventListener('mouseup', () => {
				resize = false;
			});
		});
	});
</script>

<div
	class="flex"
	on:contextmenu|preventDefault={() => (showMenu = true)}
	use:contextMenuOutside={() => (showMenu = false)}
>
	<div
		class="bg-zinc-800 overflow-x-hidden pt-5 pl-5 flex flex-col min-w-[10em] max-w-md"
		style="width: {size}px"
	>
		<Folder name="Home" files={$notes} />
	</div>
	<div class="w-1 bg-zinc-500" style="cursor: w-resize" on:mousedown={() => (resize = true)} />
</div>

<Menu bind:showMenu />
