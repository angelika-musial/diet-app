import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'signup', element: <RegistrationPage /> },
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
