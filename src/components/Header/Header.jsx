import styles from './Header.module.scss';
import logo from '../../assets/logo.png';
import CalendarDropdown from '../CalendarDropdown/CalendarDropdown';
import UserMenu from '../UserMenu/UserMenu';

const Header = () => {
	return (
		<>
			<header>
				<div className={styles.container}>
					<img src={logo} alt='CalorIQ logo' className={styles.logo} />
					<CalendarDropdown />
					<UserMenu />
				</div>
			</header>
		</>
	);
};

export default Header;
