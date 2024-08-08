import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

const useAxios2 = () => {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const axiosInstance = axios.create({
		baseURL: 'https://jsonplaceholder.typicode.com',
	});

	// ---------------------------------- INTERCEPTORS ----------------------------------

	// Adding a request interceptor to the Axios instance
	axiosInstance.interceptors.request.use(
		(config) => {
			// This function is called before every request is sent.
			// The `config` object contains information about the request, such as the URL, headers, method, etc.
			// This is a good place to add custom headers, log requests, or modify the request configuration.
			console.log('Request interceptor', config); // Logging the request configuration for debugging purposes
			return config; // The modified (or unmodified) config is returned and the request continues as normal
		},
		(error) => {
			// This function is called if there is an error when setting up the request.
			// This could happen if, for example, there was an issue with the request configuration before it was sent.
			console.log('Request interceptor error', error); // Logging the error for debugging purposes
			return Promise.reject(error); // Rejecting the promise, which allows the error to be caught in the calling function
		},
	);

	// Adding a response interceptor to the Axios instance
	axiosInstance.interceptors.response.use(
		(response) => {
			// This function is called when the response is received successfully.
			// The `response` object contains data from the server, including status code, headers, and the actual data returned.
			// This is a good place to handle or transform the response data before it is passed to the calling function.
			console.log('Response interceptor', response); // Logging the response for debugging purposes
			return response; // The modified (or unmodified) response is returned and passed to the calling function
		},
		(error) => {
			// This function is called if there is an error in the response, such as a non-2xx status code.
			// This is where you can handle specific HTTP errors, like 404 Not Found or 500 Internal Server Error.
			console.log('Response interceptor error', error); // Logging the error for debugging purposes
			return Promise.reject(error); // Rejecting the promise, which allows the error to be caught in the calling function
		},
	);

	// ---------------------------------- INTERCEPTORS ----------------------------------

	const controllerRef = useRef(null);

	useEffect(() => {
		return () => {
			controllerRef.current?.abort(); // Abort the previous request if it exists, on unmount
		};
	}, []);

	const fetchData = async ({ url, method, data = {}, params = {} }) => {
		if (controllerRef.current) {
			controllerRef.current.abort(); // Abort the previous request if it exists
		}
		const controller = new AbortController();
		controllerRef.current = controller; // Store the new controller in the ref
		setLoading(true);
		try {
			const result = await axiosInstance({
				url,
				method,
				data,
				params,
				signal: controller.signal,
			});
			setResponse(result.data);
		} catch (error) {
			/* if (error.name === 'AbortError') {
				console.log('Fetch aborted');
			} */
			if (axios.isCancel(error)) {
				console.log('Fetch aborted', error.message);
			} else {
				console.log(error);
				setError(error.response ? error.response.data : error.message);
			}
		} finally {
			setLoading(false);
		}
	};

	return { response, error, loading, fetchData };
};

export default useAxios2;
