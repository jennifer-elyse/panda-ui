import { useMemo } from 'react';


const useSortedData = (data, sortConfig) => {
	return useMemo(() => {
		if (!data) {
			return [];
		}

		const { key, direction } = sortConfig;
		return [...data].sort((itemA, itemB) => {
			// Write logic to use sort `key` and `direction` to compare items.
			let order = itemA[key] < itemB[key] ? -1 : 1;
			if (direction === 'desc') {
				order *= -1;
			}
			return order;
		});
	}, [data, sortConfig]);
};

export default useSortedData;
