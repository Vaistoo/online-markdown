<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/a11y-dark.css';

	import './styles/github-markdown-css.css';

	import { selectedNote } from './store/selectedNote';
	import { updateNote } from './helpers/updateNote';

	let mounted: boolean = false;

	let renderArea: HTMLDivElement;
	let editor: HTMLTextAreaElement;

	let md: string;

	onMount(() => {
		mounted = true;

		selectedNote.subscribe((x) => {
			md = x?.md;
		});

		editor.addEventListener('focusout', (event) => {
			if ($selectedNote) {
				updateNote($selectedNote.key, md);
			}
		});
	});

	onDestroy(() => {
		editor.removeEventListener('focusout', () => {});
	});

	function render(md) {
		if (mounted) {
			// @ts-ignore
			const MarkdownIt = window.markdownit('commonmark', {
				highlight: function (str, lang) {
					if (lang && hljs.getLanguage(lang)) {
						try {
							return hljs.highlight(str, { language: lang }).value;
						} catch (e) {}
					}

					return ''; // use external default escaping
				}
			});
			renderArea.innerHTML = MarkdownIt.render(md);
		}
	}

	function focusEditor() {
		if (mounted) {
			editor.focus();
		}
	}

	$: render(md);
</script>

<svelte:head>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.2.0/markdown-it.js"></script>
</svelte:head>

<div class="flex fex-col w-full bg-zinc-900 justify-center p-5">
	<div class="notepad markdown-body" bind:this={renderArea} on:click={focusEditor} />
	<textarea class="notepad" style="height: calc(100% - 2.5em)" bind:this={editor} bind:value={md} />
</div>

<style lang="postcss">
	.notepad {
		@apply rounded-lg shadow-xl;
	}
	textarea {
		@apply p-5 w-[35em] overflow-auto absolute z-0 resize-none bg-transparent text-transparent outline-none focus:bg-zinc-800 focus:text-gray-50 focus:z-20;
	}
	.markdown-body {
		@apply p-5 w-[35em] overflow-auto bg-zinc-800 h-full z-10 select-none;
	}
</style>
