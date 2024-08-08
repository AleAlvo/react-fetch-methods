import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addTodo, fetchTodos } from './api/apiIndex';
import TodoCard from './components/TodoCard';
import { useState } from 'react';

function ReactQuery2() {
	const [title, setTitle] = useState('');
	const [search, setSearch] = useState('');

	const queryClient = useQueryClient();

	const {
		isError,
		error,
		isSuccess,
		data: todos,
		isLoading,
	} = useQuery({
		queryFn: () => fetchTodos(search),
		queryKey: ['todos', { search }], // search is if you want to use a parameter according to api declaration
		staleTime: 2000 /* use Infinity if you want it to never go stale*/,
		/* cacheTime: 0, to never cache data */
	});

	const { /* mutate,  */ mutateAsync: addTodoMutation, isPending } = useMutation({
		mutationFn: addTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>ReactQuery Page 2</h1>
			<b>React Query Tutorial</b>
			<input
				type='text'
				onChange={(event) => setTitle(event.target.value)}
				value={title}
			/>
			<button
				disabled={isLoading || isPending}
				onClick={async () => {
					try {
						await addTodoMutation({ title });
						setTitle('');
					} catch (error) {
						console.error(error);
					}
				}}>
				Add Todo
			</button>
			<div>
				{todos?.map((todo) => {
					return <TodoCard key={todo.id} todo={todo}></TodoCard>;
				})}
			</div>
		</div>
	);
}

export default ReactQuery2;
