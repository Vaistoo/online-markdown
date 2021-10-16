<script lang="ts">
	import { FolderPlusIcon, FolderMinusIcon } from 'svelte-feather-icons';
	import File from './file.svelte';

	import { contextmenuSelectedNote } from './store/contextmenuSelectedNote';
	import { iconSize } from './store/iconSize';

	import type { FileStructure } from './types/filestructure';

	export let expanded = false;
	export let name: string;
	export let files: FileStructure;

	function toggle() {
		expanded = !expanded;
	}
</script>

<div>
	{#if expanded}
		<span on:click={toggle}>
			<FolderMinusIcon size={$iconSize} />
			<span class="folder-name">{name}</span>
		</span>

		<ul>
			{#each files as file}
				<li on:contextmenu|capture={() => contextmenuSelectedNote.set(file.key.toString())}>
					{#if file.files}
						<svelte:self {...file} />
					{:else}
						<File {file} />
					{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<span on:click={toggle}>
			<FolderPlusIcon size={$iconSize} />
			<span class="folder-name">{name}</span>
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
