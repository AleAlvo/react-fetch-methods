import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import ReactFetching from './ReactFetching';
import './App.css';
import ReactQuery from './ReactQuery';
import ReactQuery2 from './ReactQuery2';
import MultipleMethods from './components/MultipleMethods';
import ReactQuery3 from './ReactQuery3';
import Axios from './Axios';
import Axios2 from './Axios2';
import ReactQuery4 from './ReactQuery4';
// import { CreatePost } from './components/CreatePostExample';

function App() {
	return (
		<Router>
			<nav>
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/react-fetching'>React Fetching</Link>
					</li>
					<li>
						<Link to='/react-query'>React Query</Link>
					</li>
					<li>
						<Link to='/react-query2'>React Query2</Link>
					</li>
					<li>
						<Link to='/multiple-methods'>Multiple Methods</Link>
					</li>
					<li>
						<Link to='/react-query3'>React Query 3</Link>
					</li>
					<li>
						<Link to='/axios'>Axios</Link>
					</li>
					<li>
						<Link to='/axios2'>Axios2</Link>
					</li>
					<li>
						<Link to='/react-query-4'>react-query-4</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/react-fetching' element={<ReactFetching />} />
				<Route path='/react-query' element={<ReactQuery />} />
				<Route path='/react-query2' element={<ReactQuery2 />} />
				<Route path='/multiple-methods' element={<MultipleMethods />} />
				<Route path='/react-query3' element={<ReactQuery3 />} />
				{/* This page won't work, but has a bunch of examples for ReactQuery mutations */}
				{/* <Route path='/create-post-example' element={<CreatePost />} /> */}
				<Route path='/axios' element={<Axios />} />
				<Route path='/axios2' element={<Axios2 />} />
				<Route path='/react-query-4' element={<ReactQuery4 />} />
			</Routes>
		</Router>
	);
}

export default App;
