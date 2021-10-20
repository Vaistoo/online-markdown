import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type { FileStructure } from '../types/filestructure';
import { starterFile } from '../helpers/starterMarkdownFile';

let stored;

try {
	stored = JSON.parse(localStorage.files);
} catch {}

export const files: Writable<FileStructure> = writable(stored || []);
files.subscribe((value) => (localStorage.files = JSON.stringify(value)));

if (!get(files) || get(files).length === 0) {
	files.set([starterFile]);
}
