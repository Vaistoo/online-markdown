<script lang="ts">
	import { FolderPlusIcon, FolderMinusIcon } from 'svelte-feather-icons';
	import File from './file.svelte';
	import { contextmenuSelectedNote } from './store/contextmenuSelectedNote';
	import { iconSize } from './store/iconSize';
	import Rename from './rename.svelte';
	import type { FileStructure } from './types/filestructure';
	import type { Folder } from './types/folder';

	export let folder: Folder;
	export let files: FileStructure;

	export let expanded = false;
	function toggle() {
		expanded = !expanded;
	}

	let rename: boolean = false;
</script>

<div>
	<span
		class="py-1 pl-2 hover:bg-zinc-700"
		on:click={toggle}
		on:contextmenu={() => contextmenuSelectedNote.set(folder.key)}
	>
		{#if expanded}
			<FolderMinusIcon size={$iconSize} class="min-w-max" />
		{:else}
			<FolderPlusIcon size={$iconSize} class="min-w-max" />
		{/if}

		<Rename bind:rename key={folder.key} />
		{#if !rename}
			<span class="folder-name">{folder.name}</span>
		{/if}
	</span>

	{#if expanded}
		<ul>
			{#each files as file}
				<li>
					{#if file.files}
						<svelte:self folder={file} files={file.files} />
					{:else}
						<File {file} />
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="postcss">
	.folder-name {
		@apply pl-2;
	}

	span {
		@apply flex items-center align-middle cursor-pointer;
	}

	ul {
		@apply pl-2 truncate ml-2 list-none border-l-2 select-none cursor-pointer;
	}

	li {
		@apply truncate select-none;
	}
</style>
