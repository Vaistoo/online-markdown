import nestedProperty from 'nested-property';
import { v4 as uuidv4 } from 'uuid';

import { get } from 'svelte/store';
import { notes } from '../store/notes';

import type { MarkdownFile } from '../types/markdownfile';
import type { FileStructure } from '../types/filestructure';

export function addNote(pathToNote: string) {
	const _notes: FileStructure = get(notes);
	const newNote: MarkdownFile = {
		key: uuidv4(),
		name: 'New Note!',
		md: '# New Note!'
	};

	nestedProperty.set(_notes, pathToNote, newNote);
	notes.set(_notes);
}
