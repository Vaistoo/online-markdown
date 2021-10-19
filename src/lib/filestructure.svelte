<script lang="ts">
	import File from './file.svelte';
	import Folder from './folder.svelte';
	import contextmenuOutside from './helpers/contextMenuOutside';
	import { contextmenuSelectedNote } from './store/contextmenuSelectedNote';
	import { files } from './store/files';
</script>

<ul use:contextmenuOutside={() => contextmenuSelectedNote.set('')}>
	{#each $files as file}
		<li>
			{#if file.files}
				<Folder folder={file} files={file.files} />
			{:else}
				<File {file} />
			{/if}
		</li>
	{/each}
</ul>

<style lang="postcss">
	ul {
		@apply truncate list-none select-none cursor-pointer;
	}

	li {
		@apply truncate select-none;
	}
</style>
