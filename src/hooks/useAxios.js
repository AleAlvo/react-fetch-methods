import { useState, useEffect } from 'react';

const useAxios = (configObj) => {
	const { axiosInstance, method, url, requestConfig = {} } = configObj;
	const [response, setResponse] = useState([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const controller = new AbortController();

		const fetchData = async () => {
			try {
				const res = await axiosInstance[method.toLowerCase()](url, {
					...requestConfig,
					signal: controller.signal,
				});
				console.log(response);
				setResponse(res.data);
			} catch (error) {
				if (error.name === 'AbortError') {
					console.log('Fetch aborted');
				} else {
					console.log(error);
					setError(error.message);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		// useEffect cleanup function
		return () => {
			controller.abort();
		};
	}, []);

	return [response, error, loading];
};

export default useAxios;
