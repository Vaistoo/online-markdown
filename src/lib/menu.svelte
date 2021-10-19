<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { FilePlusIcon, DeleteIcon, Edit3Icon, FolderPlusIcon } from 'svelte-feather-icons';
	import clickOutside from 'svelte-outside-click';

	import { contextmenuSelectedNote } from './store/contextmenuSelectedNote';
	import { addNote, addFolder } from './helpers/file-structure/add';

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
		use:clickOutside={closeMenu}
		transition:fade={{ duration: 100 }}
	>
		<div>
			<div
				class="flex hover:bg-gray-600 cursor-pointer px-4 py-1 items-center"
				on:click={() => {
					addNote();
					closeMenu();
				}}
			>
				<FilePlusIcon size="20" />
				<span class="pl-3">New file</span>
			</div>
			<div
				class="flex hover:bg-gray-600 cursor-pointer px-4 py-1 items-center"
				on:click={() => {
					addFolder();
					closeMenu();
				}}
			>
				<FolderPlusIcon size="20" />
				<span class="pl-3">New folder</span>
			</div>
		</div>
		{#if $contextmenuSelectedNote}
			<div>
				<div class="flex hover:bg-gray-600 cursor-pointer px-4 py-1 items-center">
					<Edit3Icon size="20" />
					<span class="pl-3">Rename</span>
				</div>
				<div class="flex hover:bg-gray-600 cursor-pointer px-4 py-1 items-center">
					<DeleteIcon size="20" />
					<span class="pl-3">Delete</span>
				</div>
			</div>
		{/if}
	</div>
{/if}
