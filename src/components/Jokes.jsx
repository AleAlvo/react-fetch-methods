import React from 'react';
import useAxios from '../hooks/useAxios';
import axios from '../api/dadJokes';

const Jokes = () => {
	const [joke, error, loading] = useAxios({
		axiosInstance: axios,
		method: 'GET',
		url: '/',
		requestConfig: {
			headers: {
				'Content-language': 'en',
			},
			// if sending post request
			// data: {}
		},
	});
	return (
		<article>
			<h2>Random Dad Joke</h2>
			{loading && <p>Loading...</p>}
			{!loading && error && <p className='errorMessage'>{error}</p>}
			{!loading && !error && joke && <p>{joke?.joke}</p>}
			{!loading && !error && !joke && <p>No dad joke to display.</p>}
		</article>
	);
};

export default Jokes;
