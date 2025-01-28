import styles from './StartPage.module.scss';
import logo from '../assets/logo.png';

import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { Link } from 'react-router-dom';

export default function StartPage() {
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
						<Input
							type='email'
							id='email'
							name='email'
							placeholder='Adres e-mail'
							required
						/>
						<Input
							type='password'
							id='password'
							name='password'
							placeholder='Hasło'
							required
						/>
						<Button type='submit' variant='primary'>
							Zaloguj się
						</Button>
					</form>
				</div>

				<div className={styles.divider}></div>

				<div>
					<h3 className={styles.title}>Nie masz jeszcze konta?</h3>
					<Button as={Link} to='/signup' variant='secondary'>
						Zarejestruj się
					</Button>
				</div>
			</div>
		</div>
	);
}
