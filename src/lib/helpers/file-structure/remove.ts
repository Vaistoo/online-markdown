import nestedProperty from 'nested-property';

import { get } from 'svelte/store';
import { files } from '../../store/files';
import { contextmenuSelectedNote } from '../../store/contextmenuSelectedNote';

import { findPath } from '../findpath';

import type { MarkdownFile } from 'src/lib/types/markdownfile';
import type { Folder } from 'src/lib/types/folder';
import type { FileStructure } from 'src/lib/types/filestructure';

export function remove() {
	const _files: FileStructure = get(files);
	const selectedKey: string = get(contextmenuSelectedNote);
	const pathToSelectedItem: string = selectedKey ? findPath(_files, 'key', selectedKey) : '';
	const selectedItem: MarkdownFile | Folder = pathToSelectedItem
		? nestedProperty.get(_files, pathToSelectedItem)
		: '';

	if (selectedItem) {
		// handle selection from base of file structure
		if (!isNaN(Number(pathToSelectedItem))) {
			files.set(_files.filter((node) => node.key !== selectedKey));
			contextmenuSelectedNote.set('');
			return;
		}

		// handle selected
		const pathToParentFolder: string = pathToSelectedItem.substring(
			0,
			pathToSelectedItem.lastIndexOf('.files')
		);

		const parentFolder: Folder = nestedProperty.get(_files, pathToParentFolder);

		parentFolder.files = parentFolder.files.filter((node) => node.key !== selectedKey);

		nestedProperty.set(_files, pathToParentFolder, parentFolder);
		files.set(_files);

		contextmenuSelectedNote.set('');
		return;
	}
}
