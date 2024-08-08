import { useQuery, useMutation, useQueryClient, useQueries } from '@tanstack/react-query';

import { wait, mockPosts, fetchPostById } from './utils/utils';
import Post from './components/Post1';

function ReactQuery3() {
	console.log(mockPosts);
	const queryClient = useQueryClient();

	// Keys are very important to these queries. They must be unique and identifiable
	// get all posts: /posts -> ['posts]
	// get one post: /posts/1 -> ['posts', post.id]
	// all posts by one author: /posts/authorId=1 -> ['posts', {authorId: author.id}]
	// comments from one post: /posts/2/comments -> ['posts', post.id, 'comments']

	const postsQuery = useQuery({
		queryKey: ['posts'],
		queryFn: ({ queryKey }) =>
			wait(1000).then(() => {
				console.log('current query key', { queryKey });
				return [...mockPosts];
			}),
		// initialData is considered fresh, so no refetch will be triggered
		// initialData: [{ id: 1, title: 'Initial Data' }],
		// if we want to show something, but still trigger a fetch for actual data
		// use placeholderData
		placeholderData: [{ id: 1, title: 'Initial Data' }],
		// refetchInterval: 1000, to refetch the data after an amount of time
		// queryFn: () => Promise.reject('Error Message'),
		// to check the behavior of TanStack Query with errors.
		// It tries the fetch multiple times before actually
		// displaying the error message
	});

	// Hook to create multiple queries
	const multipleQueries = useQueries({
		queries: (postsQuery?.data ?? []).map((post) => {
			return {
				queryKey: ['posts', post.id],
				queryFn: () => fetchPostById(post.id),
			};
		}),
	});

	console.log(
		'log useQueries result',
		multipleQueries.map((q) => q.data),
	);

	// we can prefetch data, for example, when we hover over a link
	// but before pressing it
	// this does not work, it is just an example
	function onHoverPostOneLink() {
		queryClient.prefetchQuery({
			queryKey: ['posts', 1],
			queryFn: () => fetchPostById(1),
		});
	}

	// Use this to add elements to your data
	const newPostMutation = useMutation({
		mutationFn: (title: string) => {
			return wait(1000).then(() =>
				mockPosts.push({ id: Math.random() * 100, title, userId: Math.random() * 1000 }),
			);
		},
		// the onSuccess triggers after you have successfully mutated
		// in this case, the invalidateQueries will refetch data, as we are
		// telling ReactQuery that the old data is not useful anymore,
		// as it is missing data
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] });
		},
	});

	if (postsQuery.isLoading) return <h1>Loading...</h1>;
	if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

	return (
		<div>
			{postsQuery.data?.map((post) => (
				<div key={post.id}>{post.title}</div>
			))}
			<button
				disabled={newPostMutation.isPending}
				onClick={() => newPostMutation.mutate('New Post')}>
				Add new post
			</button>
			<Post id={1} />
		</div>
	);
}

export default ReactQuery3;
