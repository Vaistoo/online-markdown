import type { FileStructure } from './filestructure';

export type Folder = {
	key: string;
	name: string;
	files: FileStructure;
};
