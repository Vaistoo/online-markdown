<script lang="ts">
	import { fade } from 'svelte/transition';

	import clickOutside from 'svelte-outside-click';
	import { FilePlusIcon, DeleteIcon, Edit3Icon, FolderPlusIcon } from 'svelte-feather-icons';
	import { onMount } from 'svelte';

	export let showMenu: boolean = false;
	let clientX: number;
	let clientY: number;

	onMount(() => {
		addEventListener('contextmenu', (e: MouseEvent) => {
			if (showMenu) {
				clientX = e.clientX;
				clientY = e.clientY;
			}
		});
	});

	function closeMenu() {
		showMenu = false;
	}
</script>

{#if showMenu}
	<div
		class="absolute flex-col bg-zinc-800 border-[2px] border-zinc-700 rounded-lg divide-y-2 divide-zinc-600 overflow-hidden shadow-xl z-[1000]"
		style="top: {clientY}px; left: {clientX}px;"
		on:click={closeMenu}
		use:clickOutside={closeMenu}
	>
		<div>
			<div
				transition:fade={{ duration: 100 }}
				class="flex hover:bg-gray-600 cursor-pointer px-4 py-1 items-center"
			>
				<FilePlusIcon size="20" />
				<span class="pl-3">New file</span>
			</div>
			<div
				transition:fade={{ duration: 100 }}
				class="flex hover:bg-gray-600 cursor-pointer px-4 py-1 items-center"
			>
				<Edit3Icon size="20" />
				<span class="pl-3">Rename file</span>
			</div>
			<div
				transition:fade={{ duration: 100 }}
				class="flex hover:bg-gray-600 cursor-pointer px-4 py-1 items-center"
			>
				<DeleteIcon size="20" />
				<span class="pl-3">Delete file</span>
			</div>
		</div>
		<div>
			<div
				transition:fade={{ duration: 100 }}
				class="flex hover:bg-gray-600 cursor-pointer px-4 py-1 items-center"
			>
				<FolderPlusIcon size="20" />
				<span class="pl-3">New folder</span>
			</div>
			<div
				transition:fade={{ duration: 100 }}
				class="flex hover:bg-gray-600 cursor-pointer px-4 py-1 items-center"
			>
				<Edit3Icon size="20" />
				<span class="pl-3">Rename folder</span>
			</div>
			<div
				transition:fade={{ duration: 100 }}
				class="flex hover:bg-gray-600 cursor-pointer px-4 py-1 items-center"
			>
				<DeleteIcon size="20" />
				<span class="pl-3">Delete folder</span>
			</div>
		</div>
	</div>
{/if}
