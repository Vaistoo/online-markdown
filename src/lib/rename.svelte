<script lang="ts">
	import { onMount } from 'svelte';
	import { update } from './helpers/file-structure/update';
	import { renameSelectedNote } from './store/renameSelectedNote';

	export let key: string = '';
	export let rename: boolean = false;

	let inputEl: HTMLInputElement;
	$: {
		if ($renameSelectedNote && key === $renameSelectedNote) {
			rename = true;

			requestAnimationFrame(() => {
				inputEl.focus();
			});
		} else {
			rename = false;
		}
	}

	onMount(() => {
		inputEl.addEventListener('focusout', () => {
			if (inputEl.value) {
				update('name', inputEl.value);
			}
			renameSelectedNote.set('');
		});
	});
</script>

<input
	class="w-full mx-2 bg-zinc-900 hidden"
	class:show-input={rename}
	bind:this={inputEl}
	on:click|stopPropagation
/>

<style lang="postcss">
	.show-input {
		@apply block;
	}
</style>
