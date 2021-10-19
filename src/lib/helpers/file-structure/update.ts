import nestedProperty from 'nested-property';

import { get } from 'svelte/store';
import { files } from '../../store/files';
import { contextmenuSelectedNote } from '../../store/contextmenuSelectedNote';

import { findPath } from '../findpath';

import type { MarkdownFile } from 'src/lib/types/markdownfile';
import type { Folder } from 'src/lib/types/folder';
import type { FileStructure } from 'src/lib/types/filestructure';

export function update(key: keyof MarkdownFile | keyof Folder, value: string) {
	const _files: FileStructure = get(files);
	const selectedKey: string = get(contextmenuSelectedNote);
	const pathToSelectedItem: string = selectedKey ? findPath(_files, 'key', selectedKey) : '';
	const selectedItem: MarkdownFile | Folder = pathToSelectedItem
		? nestedProperty.get(_files, pathToSelectedItem)
		: '';

	if (selectedItem) {
		const newNode = {
			...selectedItem,
			[key]: value
		};
		nestedProperty.set(_files, pathToSelectedItem, newNode);

		files.set(_files);
		contextmenuSelectedNote.set('');
		return;
	}
}
