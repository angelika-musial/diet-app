import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import Button from '../Button/Button';
import styles from './Header.module.scss';
import logo from '../../assets/logo.png';
import CalendarDropdown from '../CalendarDropdown/CalendarDropdown';

const Header = () => {
	const { clearUser } = useUserStore();
	const navigate = useNavigate();

	const handleSignout = async () => {
		try {
			await signOut(auth);
			clearUser();
			navigate('/');
		} catch (error) {
			console.error('Błąd wylogowania:', error);
		}
	};
	return (
		<>
			<header>
				<img src={logo} alt='CalorIQ logo' className={styles.logo} />
				<CalendarDropdown />
				<Button
					variant='secondary'
					onClick={handleSignout}
					className={styles.signoutButton}
				>
					Wyloguj
				</Button>
			</header>
		</>
	);
};

export default Header;
