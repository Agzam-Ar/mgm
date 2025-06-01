import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Pet from './Pet';

const router = createBrowserRouter([
	{
		path: "/mgm/",
		element: <Home/>,
		errorElement: <div>404</div>,

	},
	{
		path: "/mgm/edit",
		element: <Home edit={true}/>,
		errorElement: <div>404</div>,
	},
	{
		path: "/mgm/pet",
		element: <Pet/>,
		errorElement: <div>404</div>,
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
