import styles from './HomePage.module.scss';
import logo from '../assets/logo.png';

import Input from '../components/Input/Input';
import Button from '../components/Button/Button';

const HomePage = () => {
	return (
		<div className={styles.container}>
			<img src={logo} alt='CalorIQ logo' className={styles.logo} />
			<h1 className={styles.header}>
				Witaj w CalorIQ - aplikacji, która pomoże Ci zadbać o zdrową dietę i
				osiągnąć cele!
			</h1>

			<div className={styles.formSection}>
				<div>
					<h3 className={styles.title}>Zaloguj się</h3>
					<form className={styles.form}>
						<Input type='email' placeholder='Adres e-mail' required />
						<Input type='password' placeholder='Hasło' required />
						<Button type='submit' variant='primary'>
							Zaloguj się
						</Button>
					</form>
				</div>

				<div className={styles.divider}></div>

				<div>
					<h3 className={styles.title}>Nie masz jeszcze konta?</h3>
					<Button variant='secondary' navigateTo='/register'>
						Zarejestruj się
					</Button>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
