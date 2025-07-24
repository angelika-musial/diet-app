import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RootLayout from './pages/RootLayout';
import StartPage from './pages/StartPage/StartPage';
import RegistrationPage from './pages/RegistrationPage';
import MainPage from './pages/MainPage/MainPage';
import ProfileSetup from './pages/ProfileSetup';
import ProtectedRoutes from './utils/ProtectedRoutes';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <StartPage /> },
			{ path: 'signup', element: <RegistrationPage /> },

			{
				element: <ProtectedRoutes />,
				children: [
					{ path: 'main', element: <MainPage /> },
					{ path: 'profile-setup', element: <ProfileSetup /> },
				],
			},
		],
	},
]);

const App = () => {
	return (
		<>
			<RouterProvider router={router} />
			<Toaster position='top-center' />
		</>
	);
};

export default App;
