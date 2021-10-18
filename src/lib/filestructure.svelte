<script lang="ts">
	import { set } from 'nested-property';
	import File from './file.svelte';
	import Folder from './folder.svelte';

	import contextMenuOutside from './helpers/contextMenuOutside';
	import { contextmenuSelectedNote } from './store/contextmenuSelectedNote';

	import { files } from './store/files';
</script>

<ul use:contextMenuOutside={() => contextmenuSelectedNote.set('')}>
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
		@apply truncate ml-2 list-none select-none cursor-pointer;
	}

	li {
		@apply py-1 truncate select-none;
	}
</style>
