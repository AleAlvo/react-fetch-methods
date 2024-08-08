import useAxios2 from '../hooks/useAxios2.js';

const useAxiosActions = () => {
	const { fetchData } = useAxios2();

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

	return { fetchPosts, createPost, updatePost, deletePost };
};

export default useAxiosActions;
