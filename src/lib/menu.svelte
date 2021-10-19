<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { FilePlusIcon, DeleteIcon, Edit3Icon, FolderPlusIcon } from 'svelte-feather-icons';
	import clickOutside from 'svelte-outside-click';
	import { contextmenuSelectedNote } from './store/contextmenuSelectedNote';
	import { renameSelectedNote } from './store/renameSelectedNote';
	import { addNote, addFolder } from './helpers/file-structure/add';
	import { remove } from './helpers/file-structure/remove';

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
				class="menu-item"
				on:click={() => {
					addNote();
					closeMenu();
				}}
			>
				<FilePlusIcon size="20" />
				<span class="pl-3">New file</span>
			</div>
			<div
				class="menu-item"
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
				<div
					class="menu-item"
					on:click={() => {
						renameSelectedNote.set($contextmenuSelectedNote);
						closeMenu();
					}}
				>
					<Edit3Icon size="20" />
					<span class="pl-3">Rename</span>
				</div>
				<div
					class="menu-item"
					on:click={() => {
						remove();
						closeMenu();
					}}
				>
					<DeleteIcon size="20" />
					<span class="pl-3">Delete</span>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style lang="postcss">
	.menu-item {
		@apply flex hover:bg-gray-600 cursor-pointer px-4 py-1 items-center;
	}
</style>
