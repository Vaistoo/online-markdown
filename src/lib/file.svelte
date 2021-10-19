<script lang="ts">
	import { FileTextIcon } from 'svelte-feather-icons';
	import { contextmenuSelectedNote } from './store/contextmenuSelectedNote';

	import { iconSize } from './store/iconSize';
	import { selectedNote } from './store/selectedNote';

	import type { MarkdownFile } from './types/markdownfile';

	export let file: MarkdownFile;

	function select(file: MarkdownFile) {
		selectedNote.set(file);
	}
</script>

<span
	class:selected={file.key === $selectedNote?.key}
	class="py-1 pl-2 flex items-center align-middle hover:bg-zinc-700"
	on:click={() => select(file)}
	on:contextmenu={() => contextmenuSelectedNote.set(file.key)}
>
	<FileTextIcon size={$iconSize} />
	<span id={file.key.toString()} class="filename">{file.name}</span>
</span>

<style lang="postcss">
	.filename {
		@apply pl-1;
	}

	.selected {
		@apply bg-zinc-600;
	}
</style>
