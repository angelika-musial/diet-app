import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import StartPage from './pages/StartPage';
import RegistrationPage from './pages/RegistrationPage';
import MainPage from './pages/MainPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ index: true, element: <StartPage /> },
			{ path: 'signup', element: <RegistrationPage /> },
			{ path: 'main', element: <MainPage /> },
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
