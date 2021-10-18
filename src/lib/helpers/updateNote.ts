import nestedProperty from 'nested-property';
import { findPath } from './findpath';

import { get } from 'svelte/store';
import { files } from '../store/files';

import type { MarkdownFile } from '../types/markdownfile';
import type { FileStructure } from '../types/filestructure';

export function updateNote(key: string, md: string) {
	const _notes: FileStructure = get(files);
	const pathToNote: string = findPath(_notes, 'key', key);

	if (pathToNote) {
		const note: MarkdownFile = nestedProperty.get(_notes, pathToNote);
		const updatedNote = {
			...note,
			md
		};

		nestedProperty.set(_notes, pathToNote, updatedNote);
		files.set(_notes);
	} else {
		console.log('uh oh spaghettio');
	}
}
