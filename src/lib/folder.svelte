<script lang="ts">
	import { FolderPlusIcon, FolderMinusIcon } from 'svelte-feather-icons';
	import File from './file.svelte';

	import { contextmenuSelectedNote } from './store/contextmenuSelectedNote';
	import { iconSize } from './store/iconSize';

	import type { FileStructure } from './types/filestructure';
	import type { Folder } from './types/folder';

	export let folder: Folder;
	export let files: FileStructure;

	export let expanded = false;

	function toggle() {
		expanded = !expanded;
	}
</script>

<div>
	{#if expanded}
		<span on:click={toggle} on:contextmenu={() => contextmenuSelectedNote.set(folder.key)}>
			<FolderMinusIcon size={$iconSize} />
			<span class="folder-name">{folder.name}</span>
		</span>

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
	{:else}
		<span on:click={toggle} on:contextmenu={() => contextmenuSelectedNote.set(folder.key)}>
			<FolderPlusIcon size={$iconSize} />
			<span class="folder-name">{folder.name}</span>
		</span>
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
		@apply py-1 truncate select-none;
	}
</style>
