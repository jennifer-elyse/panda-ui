import { useState, useEffect } from 'react';

const useCurrentTime = () => {
	const [currentTime, setCurrentTime] = useState(Date.now());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentTime(Date.now());
		}, 1000);
		return () => clearInterval(intervalId);
		// return () => console.log('unmount') || clearInterval(intervalId);
	}, []);

	return currentTime;
};

export default useCurrentTime;
