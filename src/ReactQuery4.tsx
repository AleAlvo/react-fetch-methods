import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const getPosts = () =>
	fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json());

const addPost = (newPost: any) =>
	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		body: JSON.stringify(newPost),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	}).then((res) => res.json());

const ReactQuery4 = () => {
	const queryClient = useQueryClient();

	// fetch posts query
	const { data, error, isLoading } = useQuery({
		queryKey: ['posts'],
		queryFn: getPosts,
		staleTime: 60 * 1000, // 1 minute
		refetchOnWindowFocus: false, // to not refetch data when window is focused
		retry: 3, // to retry fetching data 3 times before showing an error
		/* enabled: !!id, */ // only fetch data if id is true, useful if one query depends on another
	});

	// add post mutation
	const {
		mutate,
		mutateAsync: addPostMutation,
		isSuccess,
		isPending,
		isError,
	} = useMutation({
		mutationFn: addPost,
		onSuccess: (newPost) => {
			/* queryClient.invalidateQueries({ queryKey: ['posts'] }); */ // to refetch data
			queryClient.setQueryData(['posts'], (oldPosts: any) => {
				return [...oldPosts, { ...newPost }];
			}); // to add data optimistically
		},
		onError: (error) => {
			console.error(error);
		},
		onMutate: (newPost) => {
			console.log('onMutate', newPost);
		},
		onSettled: (newPost, error, variables, context) => {
			console.log('onSettled', newPost, error, variables, context);
		},
	});

	if (error || isError) {
		return <h1>Error: {error?.message || isError}</h1>;
	}

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div>
			<h2>React Query 4</h2>
			{isPending && <h3>Data being added</h3>}

			<button
				onClick={() =>
					addPostMutation({
						userId: 900,
						id: 9090,
						title: 'To my dad',
						body: 'I love you dad',
					})
				}>
				Add post
			</button>

			{data?.map((todo: any) => (
				<div key={todo.id}>
					<h2>ID: {todo.id}</h2>
					<h3>{todo.title}</h3>
					<p>{todo.body ? todo.body : 'no body'}</p>
				</div>
			))}
		</div>
	);
};

export default ReactQuery4;
