<script lang="ts">
	import { FileTextIcon } from 'svelte-feather-icons';
	import { contextmenuSelectedNote } from './store/contextmenuSelectedNote';
	import { iconSize } from './store/iconSize';
	import { selectedNote } from './store/selectedNote';
	import Rename from './rename.svelte';
	import type { MarkdownFile } from './types/markdownfile';

	export let file: MarkdownFile;

	function select(file: MarkdownFile) {
		selectedNote.set(file);
	}

	let rename: boolean = false;
</script>

<span
	class:selected={file.key === $selectedNote?.key}
	class="file-button"
	on:click={() => select(file)}
	on:contextmenu={() => contextmenuSelectedNote.set(file.key)}
>
	<FileTextIcon size={$iconSize} class="min-w-max" />

	<Rename bind:rename key={file.key} />
	{#if !rename}
		<span class="filename">{file.name}</span>
	{/if}
</span>

<style lang="postcss">
	.file-button {
		@apply py-1 pl-2 flex items-center align-middle hover:bg-zinc-700;
		@apply h-16 sm:h-auto;
	}
	.filename {
		@apply pl-1;
	}

	.selected {
		@apply bg-zinc-600;
	}
</style>
