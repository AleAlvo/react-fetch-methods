import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// In default options, fetches go stale immediately
/* const queryClient = new QueryClient(); */

// This changes the default fresh/stale time of fetches to 5 minutes
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			// refetchInterval: 1000, if I want data to refetch after an amount of time
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
			{/* To have access to the React Query dev tools throughout the app */}
			<ReactQueryDevtools />
		</QueryClientProvider>
	</React.StrictMode>,
);
