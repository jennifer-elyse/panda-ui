import { useState, useCallback } from 'react';



const useToggle = (initialState) => {
	const [state, setState] = useState(initialState);

	const toggleState = useCallback(() => {
		setState(currentState => !currentState);
	}, []);

	return [state, toggleState];
};

export default useToggle;
