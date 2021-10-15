import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const iconSize: Writable<string> = writable('25');
