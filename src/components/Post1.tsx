import { useQuery } from '@tanstack/react-query';
import { fetchPostById, fetchUserIdByPostId } from '../utils/utils';

// This component shows how sequential data fetching works with React Query
export default function Post({ id }: { id: number }) {
	const postQuery = useQuery({
		queryKey: ['post', id],
		queryFn: () => fetchPostById(id),
		// keepPreviousData: true, if we want to keep showing previous data, useful for pagination
	});

	const userQuery = useQuery({
		queryKey: ['users', postQuery?.data?.id],
		// by using the enabled option, this query will only trigger
		// once the conditional passed onto it works
		enabled: postQuery?.data?.id != null,
		queryFn: () => fetchUserIdByPostId(postQuery?.data?.id),
		staleTime: 1000,
	});

	console.log(postQuery.data);
	console.log(userQuery.data);

	return (
		<>
			<h1>
				{postQuery.data?.title} <br />
				<small>
					{userQuery.isLoading
						? 'Loading user'
						: userQuery.isError
						? 'Error loading user'
						: userQuery.data || ''}
				</small>
			</h1>
		</>
	);
}
