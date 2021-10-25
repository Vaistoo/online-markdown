import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

// open = true, closed = false
export const sidenavState: Writable<boolean> = writable(true);
