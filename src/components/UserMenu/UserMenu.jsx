import { useEffect, useRef, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import useProductStore from '../../store/useProductStore';
import { toast } from 'react-hot-toast';
import { Settings, LogOut, User } from 'lucide-react';
import styles from './UserMenu.module.scss';

const UserMenu = () => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);
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

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className={styles.wrapper} ref={dropdownRef}>
			<button
				className={styles.iconButton}
				onClick={() => setOpen((prev) => !prev)}
			>
				<Settings size={32} />
			</button>

			{open && (
				<div className={styles.dropdown}>
					<button
						onClick={() => {
							navigate('/panel/ustawienia');
							setOpen(false);
						}}
					>
						<User size={22} />
						Zmień dane
					</button>

					<button onClick={handleSignout} className={styles.logout}>
						<LogOut size={22} />
						Wyloguj
					</button>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
