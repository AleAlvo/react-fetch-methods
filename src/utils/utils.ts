export function wait(duration: number) {
	return new Promise((resolve) => setTimeout(resolve, duration));
}

export const mockPosts = [
	{ id: 1, title: 'Post1', userId: 100 },
	{ id: 2, title: 'Post2', userId: 200 },
];

interface Post {
	id: number;
	title: string;
}

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts(): Promise<Post[] | void> {
	const abortController = new AbortController();

	try {
		const response = await fetch(`${BASE_URL}/posts`, {
			signal: abortController.signal,
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const posts = (await response.json()) as Post[];
		return posts;
	} catch (error: any) {
		if (error.name === 'AbortError') {
			console.log('Aborted...');
		} else {
			console.error(error);
		}
	}
}

export async function fetchPostById(postId: number): Promise<Post | void> {
	const abortController = new AbortController();

	try {
		const response = await fetch(`${BASE_URL}/posts/${postId}`, {
			signal: abortController.signal,
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const post = (await response.json()) as Post;
		return post;
	} catch (error: any) {
		if (error.name === 'AbortError') {
			console.log('Aborted...');
		} else {
			console.error(error);
		}
	}
}

export async function fetchUserIdByPostId(postId: any): Promise<number | void> {
	const abortController = new AbortController();

	try {
		const response = await fetch(`${BASE_URL}/posts/${postId}`, {
			signal: abortController.signal,
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const post = (await response.json()) as { userId: number };
		return post.userId;
	} catch (error: any) {
		if (error.name === 'AbortError') {
			console.log('Aborted...');
		} else {
			console.error(error);
		}
	}
}
