import nestedProperty from 'nested-property';
import { v4 as uuidv4 } from 'uuid';

import { get } from 'svelte/store';
import { notes } from '../../store/notes';
import { contextmenuSelectedNote } from '../../store/contextmenuSelectedNote';

import { findPath } from '../findpath';

import type { MarkdownFile } from 'src/lib/types/markdownfile';
import type { Folder } from 'src/lib/types/folder';
import type { FileStructure } from 'src/lib/types/filestructure';

export function addNote(key: string) {
	const newNote: MarkdownFile = {
		key: uuidv4(),
		name: 'New Note!',
		md: '# New Note!'
	};

	_add(key, newNote);
}

export function addFolder(key: string) {
	const newFolder: Folder = {
		key: uuidv4(),
		name: 'New Folder!',
		files: []
	};

	_add(key, newFolder);
}

function _add(key: string, newNode: Folder | MarkdownFile) {
	let _notes: FileStructure = get(notes);
	const pathToSelectedItem: string = findPath(_notes, 'key', key);

	// add file to base of structure
	if (!key || (!isNaN(Number(pathToSelectedItem)) && !_notes[Number(pathToSelectedItem)]?.files)) {
		notes.set([..._notes, newNode]);
		contextmenuSelectedNote.set('');
		return;
	}

	// handle if user clicked a folder
	if (key && nestedProperty.get(_notes, pathToSelectedItem)?.files) {
		const selectedItem: MarkdownFile | Folder = nestedProperty.get(_notes, pathToSelectedItem);

		(<Folder>selectedItem).files = [...(<Folder>selectedItem).files, newNode];

		nestedProperty.set(_notes, pathToSelectedItem, selectedItem);
		notes.set(_notes);
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
			files: [...parentFolder.files, newNode]
		});

		notes.set(_notes);
		contextmenuSelectedNote.set('');
	} catch {
		console.log('uh oh spaghettio!');
	}
}
