import useUserStore from '../../store/useUserStore';
import Button from '../../components/Button/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function MainPage() {
	const { user, clearUser } = useUserStore();
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');

	const handleSignout = async () => {
		try {
			await signOut(auth);
			clearUser();
			navigate('/');
		} catch (error) {
			console.error('Błąd wylogowania:', error);
			setErrorMessage('Ups! Coś poszło nie tak podczas wylogowywania.');
		}
	};

	return (
		<>
			<h1>Witaj {user?.name}</h1>
			<Button onClick={handleSignout}>Wyloguj</Button>
			{errorMessage && <p className={styles.error}>{errorMessage}</p>}
		</>
	);
}
