// this doesn't work, it's only here to show ReactQuery mutation functionalities

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { createPost } from './api/posts';
import Post from './Post1';

export function CreatePost({ setCurrentPage }) {
	const titleRef = useRef();
	const bodyRef = useRef();
	const queryClient = useQueryClient();

	const createPostMutation = useMutation({
		// in this case, we don't need to specify the variables being passed onto it
		// it already knows to do it
		mutationFn: createPost,
		// same as mutationFn: (variables) => {createPost(variables}
		onSuccess: (data, variables, context) => {
			console.log(context);
			// we can manually set the cache, so it shows the new data immeadiately, before refetching
			queryClient.setQueryData(['posts', data.id], data);
			// the invalidateQueries is really important to make sure we are not
			// presenting old data to our users
			queryClient.invalidateQueries({ queryKey: ['posts'] }); // invalidates all queries with 'posts' as the first element of the array
			queryClient.invalidateQueries({ queryKey: ['posts'], exact: true }); // invalidates only the query that matches it exactly
			queryClient.invalidateQueries({ queryKey: ['posts', id] }); // invalidates queries a little more specifically, all the ones matching these two as the first arguments
			queryClient.invalidateQueries(); // invalidates all queries
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === 'todos' && query.queryKey[1]?.version >= 0,
			}); // invalidates using a method that returns either true or false for invalidation
			setCurrentPage(<Post id={data.id} />);
		},
		onError: (error, variables, context),
		onSettled: (data, error, variables, context), //same as 'finally' in promises
		//on Mutate runs before the mutationFn and everything else
		// this is where the context is actually set
		// also use it if you need to do anything before mutating
		onMutate: (variables) => {
			return { hi: 'Bye', variables };
		},
		// useMutation does not retry by default, but you can do it
		// not advised
		retry: 3,
	});

	// important properties
	createPostMutation.data;
	createPostMutation.status; // error, pending, idle, success, paused
	createPostMutation.error;
	createPostMutation.isIdle; //isError, isSuccess, isLoading, isPending, isPaused
	createPostMutation.variables;
	createPostMutation.submittedAt;
	createPostMutation.mutate();
	createPostMutation.mutateAsync(); // uses promises, so:
	createPostMutation
		.mutateAsync()
		.then(() => {})
		.catch(() => {});

	function handleSubmit(e) {
		e.preventDefault();
		createPostMutation.mutate({
			title: titleRef.currentValue,
			body: bodyRef.currentValue,
		});
	}

	return (
		<div>
			{createPostMutation.isError && JSON.stringify(createPostMutation.error)}
			<h1>CreatePost</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='body'>Body</label>
					<input id='body' ref={bodyRef} />
				</div>
				<button disabled={createPostMutation.isLoading}>
					{createPostMutation.isLoading ? 'Loading...' : 'Create'}
				</button>
			</form>
		</div>
	);
}
