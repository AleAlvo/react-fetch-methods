import { useEffect, useRef, useState } from 'react';
import './App.css';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

interface Post {
	id: number;
	title: string;
}

function ReactFetching() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);

	const abortControllerRef = useRef<AbortController | null>(null);

	useEffect(() => {
		const fetchPosts = async () => {
			abortControllerRef.current?.abort();
			abortControllerRef.current = new AbortController();

			setIsLoading(true);

			try {
				const response = await fetch(`${BASE_URL}/posts?page=${page}`, {
					signal: abortControllerRef.current?.signal,
				});

				const posts = (await response.json()) as Post[];
				setPosts(posts);
			} catch (error: any) {
				if (error.name === 'AbortError') {
					console.log('Aborted...');
					return;
				}

				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPosts();
	}, [page]);

	if (error) {
		return <div>Something went wrong...</div>;
	}

	return (
		<div className='tutorial'>
			<h1 className='something'>Data fetching in React</h1>
			<button onClick={() => setPage(page - 1)}>Go to page {page - 1}</button>
			<button onClick={() => setPage(page + 1)}>Go to page {page + 1}</button>
			{isLoading && <div>Loading...</div>}
			{!isLoading && (
				<ul>
					{posts.map((post) => (
						<li key={post.id}>{post.title}</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default ReactFetching;
