import styles from './StartPage.module.scss';
import logo from '../assets/logo.png';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../utils/validation';

export default function StartPage() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data) => {
		try {
			console.log('Dane logowania:', data);
		} catch (error) {
			console.error('Błąd logowania:', error);
		}
	};

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
					<form
						onSubmit={handleSubmit(onSubmit)}
						className={styles.form}
						noValidate
						aria-busy={isSubmitting}
					>
						<Input
							type='email'
							id='email'
							placeholder='Adres e-mail'
							{...register('email')}
							error={errors.email?.message}
						/>
						<Input
							type='password'
							id='password'
							placeholder='Hasło'
							{...register('password')}
							error={errors.password?.message}
						/>
						<Button disabled={isSubmitting} type='submit'>
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
