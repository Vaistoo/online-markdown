import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { MarkdownFile } from '../types/markdownfile';

export const selectedNote: Writable<MarkdownFile | null> = writable(null);
