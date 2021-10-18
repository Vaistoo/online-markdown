import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type { FileStructure } from '../types/filestructure';

let _: FileStructure = [
	{
		key: 'eaa72780-6abe-4b0c-a70a-30bd144b4449',
		name: 'b',
		md: '# title 1'
	},
	{
		key: '7d097b52-9934-4f48-933a-e289d61f4d36',
		name: 'b',
		md: '# title 2'
	},
	{
		key: 'cfeeb577-e2e8-4555-ba27-0a3e35376096',
		name: 'a',
		files: [
			{
				key: '6f2ba3f4-33bd-4589-a36d-f84c23763f5d',
				name: 'b',
				md: '# title'
			},
			{
				key: '5d7d62f0-5a68-4620-9288-a9f97d512794',
				name: 'a',
				files: [
					{
						key: 'cb59ad8c-8893-406e-810f-b88f912b473e',
						name: 'a',
						files: [
							{
								key: '202cfaf0-7049-4d34-a816-de42ff2806cf',
								name: 'b',
								md: '# title'
							}
						]
					}
				]
			}
		]
	}
];

export const files: Writable<FileStructure> = writable(_);
