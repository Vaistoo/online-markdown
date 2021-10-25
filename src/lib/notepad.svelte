<script lang="ts">
	import { onMount } from 'svelte';
	import MarkdownIt from 'markdown-it';
	import emoji from 'markdown-it-emoji';
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

		initResize();
	});

	function render(md) {
		if (mounted) {
			const _ = MarkdownIt('commonmark', {
				highlight: function (str, lang) {
					if (lang && hljs.getLanguage(lang)) {
						try {
							return hljs.highlight(str, { language: lang }).value;
						} catch (e) {}
					}

					return ''; // use external default escaping
				}
			}).use(emoji);
			_.renderer.rules.emoji = (token, idx) => `<span class="emoji">${token[idx].content}</span>`;

			renderArea.innerHTML = _.render(md);
		}
	}

	function focusEditor() {
		if (mounted) {
			editor.focus();
		}
	}

	$: render(md);

	let resize: boolean = false;
	let size: number = 600;

	function initResize() {
		addEventListener('mousemove', (e) => {
			if (!resize) return;

			const centerX: number = renderArea.offsetLeft + renderArea.offsetWidth / 2;

			requestAnimationFrame(() => {
				size = size / 2 + Math.abs(e.clientX - centerX);
			});

			addEventListener('mouseup', () => {
				resize = false;
			});
		});
	}
</script>

<div class="flex fex-col w-screen bg-zinc-900 justify-center p-5">
	<div
		class="rounded-lg shadow-xl flex fex-col justify-center bg-zinc-500 px-2"
		style="cursor: w-resize"
		on:mousedown={() => (resize = true)}
	>
		<div
			class="markdown-body cursor-text"
			bind:this={renderArea}
			on:click={focusEditor}
			on:mousedown|stopPropagation
			style="width: {size}px"
		/>
		<textarea
			class="cursor-text"
			style="width: {size}px"
			on:mousedown|stopPropagation
			bind:this={editor}
			bind:value={md}
		/>
	</div>
</div>

<style lang="postcss">
	textarea {
		@apply p-5 overflow-auto absolute z-0 resize-none bg-transparent text-transparent outline-none focus:bg-zinc-800 focus:text-gray-50 focus:z-20;
	}
	.markdown-body {
		@apply p-5 overflow-auto bg-zinc-800 h-full z-10 select-none;
	}
</style>
