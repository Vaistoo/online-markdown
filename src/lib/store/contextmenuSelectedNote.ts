import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const contextmenuSelectedNote: Writable<string> = writable('');
