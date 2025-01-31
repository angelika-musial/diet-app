import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import StartPage from './pages/StartPage';
import RegistrationPage from './pages/RegistrationPage';
import MainPage from './pages/MainPage';
import ProfileSetup from './pages/ProfileSetup';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ index: true, element: <StartPage /> },
			{ path: 'signup', element: <RegistrationPage /> },
			{ path: 'main', element: <MainPage /> },
			{ path: 'profile-setup', element: <ProfileSetup /> },
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
