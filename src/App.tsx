import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Pet from './Pet';

function App() {
// 	vonst router = createBrowserRouter([
// 	{
// 		path: "/mgm/",
// 		element: <Home/>,
// 		errorElement: <div>404</div>,
// 	},
// 	{
// 		path: "/mgm/edit/",
// 		element: <Home edit={true}/>,
// 		errorElement: <div>404</div>,
// 	},
// 	{
// 		path: "/mgm/pet/",
// 		element: <Pet/>,
// 		errorElement: <div>404</div>,
// 	},
// ], {
// 	basename: '/',
// });
	if(window.location.hash == '#edit') {
		return <Home edit={true}/>;
	}
	if(window.location.hash == '#pet') {
		return <Pet/>;
	}
	return <Home/>;
	// return (
	// 	<div className="App">
	// 		<header className="App-header">
	// 			<img src={logo} className="App-logo" alt="logo" />
	// 			<p>
	// 				Edit <code>src/App.tsx</code> and save to reload.
	// 			</p>
	// 			<a
	// 				className="App-link"
	// 				href="https://reactjs.org"
	// 				target="_blank"
	// 				rel="noopener noreferrer"
	// 			>
	// 				Learn React
	// 			</a>
	// 		</header>
	// 	</div>
	// );
}

export default App;
