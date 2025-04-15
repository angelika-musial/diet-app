import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import StartPage from './pages/StartPage';
import RegistrationPage from './pages/RegistrationPage';
import MainPage from './pages/MainPage';
import ProfileSetup from './pages/ProfileSetup';
import ProtectedRoutes from './utils/ProtectedRoutes';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
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
	return <RouterProvider router={router} />;
};

export default App;
