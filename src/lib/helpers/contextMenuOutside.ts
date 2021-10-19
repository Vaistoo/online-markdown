export default function contextmenuOutside(node, onEventFunction) {
	const handleClick = (event) => {
		var path = event.composedPath();

		if (!path.includes(node)) {
			onEventFunction();
		}
	};

	document.addEventListener('contextmenu', handleClick);

	return {
		destroy() {
			document.removeEventListener('contextmenu', handleClick);
		}
	};
}
