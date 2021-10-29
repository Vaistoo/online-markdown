<script lang="ts">
	import { onMount } from 'svelte';
	import clickOutside from 'svelte-outside-click';
	import MarkdownIt from 'markdown-it';
	import emoji from 'markdown-it-emoji';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/a11y-dark.css';
	import './styles/github-markdown-css.css';
	import { selectedNote } from './store/selectedNote';
	import { updateNote } from './helpers/updateNote';
	import { sidenavState } from './store/sidenav';
	import StopEditing from './stopediting.svelte';

	let mounted: boolean = false;

	let renderArea: HTMLDivElement;
	let editor: HTMLTextAreaElement;

	let md: string;

	onMount(() => {
		mounted = true;

		selectedNote.subscribe((x) => {
			md = x?.md;
		});

		editor.addEventListener('focusout', () => {
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

	let showEditor: boolean = false;
</script>

<div class="flex fex-col w-screen justify-center sm:p-5">
	<div class="transition-all block {$sidenavState ? 'sm:ml-40' : ''}" />
	<div
		class="rounded-l-lg resize-toggle"
		style="cursor: w-resize"
		on:mousedown={() => (resize = true)}
	/>
	<div
		class="markdown-body cursor-text select-none"
		style="display: {showEditor === false ? 'block' : 'none'}; width: {size}px"
		on:click|stopPropagation={() => (showEditor = true)}
		bind:this={renderArea}
	/>
	<textarea
		class="markdown-body cursor-text"
		style="display: {showEditor === true ? 'block' : 'none'}; width: {size}px"
		use:clickOutside={() => (showEditor = false)}
		bind:value={md}
		bind:this={editor}
	/>
	<div
		class="rounded-r-lg resize-toggle"
		style="cursor: w-resize"
		on:mousedown={() => (resize = true)}
	/>
</div>

<StopEditing editing={showEditor} />

<style lang="postcss">
	:global(.markdown-body > *) {
		all: revert;
	}
	:global(.emoji) {
		@apply text-5xl;
	}

	textarea {
		@apply resize-none outline-none;
	}
	.markdown-body {
		@apply overflow-auto bg-zinc-800 h-full;
		@apply p-4 sm:p-5 sm:max-w-[80%];
	}
	.resize-toggle {
		@apply shadow-xl justify-center bg-zinc-500 p-1;
		@apply hidden sm:block;
	}
</style>
