import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type { FileStructure } from '../types/filestructure';

const stored = localStorage.files;

export const files: Writable<FileStructure> = writable(JSON.parse(stored) || []);
files.subscribe((value) => (localStorage.files = JSON.stringify(value)));
