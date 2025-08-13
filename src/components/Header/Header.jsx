import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import Button from '../Button/Button';
import styles from './Header.module.scss';
import logo from '../../assets/logo.png';
import CalendarDropdown from '../CalendarDropdown/CalendarDropdown';
import useProductStore from '../../store/useProductStore';
import { toast } from 'react-hot-toast';

const Header = () => {
	const { clearUser } = useUserStore();
	const navigate = useNavigate();
	const { logout } = useProductStore();

	const handleSignout = async () => {
		try {
			await signOut(auth);
			clearUser();
			logout();
			navigate('/');
		} catch (error) {
			toast.error('Wylogowanie nie powiodło się. Spróbuj ponownie.', {
				id: 'logout-error',
			});
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
