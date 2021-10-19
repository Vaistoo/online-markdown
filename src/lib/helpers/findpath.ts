export const findPath = (ob, key, value) => {
	function findPath(obj, name, val, currentPath = '') {
		currentPath = currentPath || '';

		let matchingPath;

		if (!obj || typeof obj !== 'object') return;

		if (obj[name] === val) return currentPath;

		for (const key of Object.keys(obj)) {
			if (key === name && obj[key] === val) {
				matchingPath = currentPath;
			} else {
				matchingPath = findPath(obj[key], name, val, `${currentPath}.${key}`);
			}

			if (matchingPath) break;
		}

		return matchingPath;
	}

	return findPath(ob, key, value).replace('.', '');
};
