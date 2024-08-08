import useAxios2 from './hooks/useAxios2.js';
/* import useAxiosActions from './api/useAxios2api'; */
import { useState } from 'react';

function Axios2() {
	// State to hold the post ID for update/delete
	const [postId, setPostId] = useState('');
	// Use the custom hooks
	const { response, error, loading, fetchData } = useAxios2();
	/* const { fetchPosts, createPost, updatePost, deletePost } = useAxiosActions(); */

	// Fetch all posts
	const fetchPosts = () => {
		fetchData({ url: '/posts', method: 'GET' });
	};

	// Create a new post
	const createPost = () => {
		fetchData({
			url: '/posts',
			method: 'POST',
			data: { title: 'New Post', body: 'This is the body of the new post', userId: 1 },
		});
	};

	// Update a post
	const updatePost = (postId) => {
		fetchData({
			url: `/posts/${postId}`,
			method: 'PUT',
			data: {
				id: postId,
				title: 'Updated Post',
				body: 'This is the updated body of the post',
				userId: 1,
			},
		});
	};

	// Delete a post
	const deletePost = (postId) => {
		fetchData({
			url: `/posts/${postId}`,
			method: 'DELETE',
		});
	};

	return (
		<div>
			<h1>Axios2</h1>
			{/* You can use the returned data and methods here */}
			{/* Example: Display loading status */}
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			<button onClick={fetchPosts}>Fetch Posts</button>
			<br />
			<button onClick={createPost}>Create Post</button>
			<br />
			<input
				type='text'
				placeholder='Post ID for update/delete'
				value={postId}
				onChange={(e) => setPostId(e.target.value)}
			/>
			<br />
			<button onClick={() => updatePost(postId)} disabled={!postId}>
				Update Post
			</button>
			<br />
			<button onClick={() => deletePost(postId)} disabled={!postId}>
				Delete Post
			</button>
			{response && <p>Data: {JSON.stringify(response)}</p>}
		</div>
	);
}

export default Axios2;
