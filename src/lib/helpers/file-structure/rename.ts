import nestedProperty from 'nested-property';
import { v4 as uuidv4 } from 'uuid';

import { get } from 'svelte/store';
import { files } from '../../store/files';
import { contextmenuSelectedNote } from '../../store/contextmenuSelectedNote';

import { findPath } from '../findpath';

import type { MarkdownFile } from 'src/lib/types/markdownfile';
import type { Folder } from 'src/lib/types/folder';
import type { FileStructure } from 'src/lib/types/filestructure';

export function rename(name: string) {
	let _notes: FileStructure = get(files);
	const pathToSelectedItem: string = findPath(_notes, 'key', get(contextmenuSelectedNote));
	const selectedItem: MarkdownFile | Folder = nestedProperty.get(_notes, pathToSelectedItem);

	if (selectedItem) {
		const newNode = {
			...selectedItem,
			name
		};
		nestedProperty.set(_notes, pathToSelectedItem, newNode);

		files.set(_notes);
		contextmenuSelectedNote.set('');
		return;
	}
}
