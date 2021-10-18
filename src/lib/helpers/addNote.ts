import nestedProperty from 'nested-property';
import { v4 as uuidv4 } from 'uuid';

import { get } from 'svelte/store';
import { files } from '../store/files';

import type { MarkdownFile } from '../types/markdownfile';
import type { FileStructure } from '../types/filestructure';
import { findPath } from './findpath';
import type { Folder } from '../types/folder';
import { contextmenuSelectedNote } from '../store/contextmenuSelectedNote';

export function addNote(key: string) {
	let _notes: FileStructure = get(files);
	const pathToSelectedItem: string = findPath(_notes, 'key', key);

	const newNote: MarkdownFile = {
		key: uuidv4(),
		name: 'New Note!',
		md: '# New Note!'
	};

	// add file to base of structure
	if (!key || (!isNaN(Number(pathToSelectedItem)) && !_notes[Number(pathToSelectedItem)]?.files)) {
		files.set([..._notes, newNote]);
		contextmenuSelectedNote.set('');
		return;
	}

	// handle if user clicked a folder
	if (key && nestedProperty.get(_notes, pathToSelectedItem)?.files) {
		const selectedItem: MarkdownFile | Folder = nestedProperty.get(_notes, pathToSelectedItem);

		(<Folder>selectedItem).files = [...(<Folder>selectedItem).files, newNote];

		nestedProperty.set(_notes, pathToSelectedItem, selectedItem);
		files.set(_notes);
		contextmenuSelectedNote.set('');
		return;
	}

	// handle if user clicked a file
	try {
		const pathToParentFolder: string = pathToSelectedItem.substring(
			0,
			pathToSelectedItem.lastIndexOf('.files')
		);
		const parentFolder: Folder = nestedProperty.get(_notes, pathToParentFolder);

		nestedProperty.set(_notes, pathToParentFolder, {
			...parentFolder,
			files: [...parentFolder.files, newNote]
		});

		files.set(_notes);
		contextmenuSelectedNote.set('');
	} catch {
		console.log('uh oh spaghettio!');
	}
}
