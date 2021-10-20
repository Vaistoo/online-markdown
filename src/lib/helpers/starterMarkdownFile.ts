import type { MarkdownFile } from '../types/markdownfile';
import { v4 as uuidv4 } from 'uuid';

export const starterFile: MarkdownFile = {
	key: uuidv4(),
	name: 'Welcome!',
	md: `# Hi! :wave: :)

Thanks for checking out otter - a rather simple markdown note app.

:rocket:

__Simply click anywhere on your note to start editing it!__

_Now take some notes and let otter make it pretty for your eyes_ 

## Check out some cool features below!

\`\`\`js
const pointless = () => console.log('YEET')
\`\`\`

1. lists
2. are
3. boring!

- so
- are
- these!`
};
