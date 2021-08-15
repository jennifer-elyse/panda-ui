// Useful hook for seeing when a component mounts, unmounts, and every render in between.
// In production mode this hook becomes a no-op.

import { useRef } from 'react';

// Always pass the same `componentName` or else it will be difficult to debug.
export default function useDebugRender(componentName) {
	if (__DEV__) {
		// This is a constant expression, it's not actually being called conditionally.
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const renderCount = useRef(0);

		// Log each render after the first one (which is already logged as a mount).
		// renderCount.current > 0 && console.log(`DEBUG RENDER: ${componentName} rendered (${renderCount.current})`);
		// Never mutate values directly in render in real code!!
		// This is a hack for debug purposes only.
		renderCount.current++;

		// Log mount and unmount
		// useEffect(() => {
		// 	console.log(`DEBUG RENDER: ${componentName} mounted`);
		// 	return () => console.log(`DEBUG RENDER: ${componentName} unmounted`);
		// }, []);
	}
}
