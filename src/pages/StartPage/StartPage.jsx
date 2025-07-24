import styles from './StartPage.module.scss';
import logo from '../../assets/logo.png';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import RedirectIfAuthenticated from '../../utils/RedirectIfAuthenticated';
import useUserStore from '../../store/useUserStore';
import { loginUser } from '../../services/auth';

export default function StartPage() {
	const navigate = useNavigate();
	const [firebaseError, setFirebaseError] = useState('');
	const { setUser } = useUserStore();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data) => {
		try {
			const { user, userData } = await loginUser(data.email, data.password);
			setUser({
				uid: user.uid,
				name: userData.name,
				surname: userData.surname,
				email: user.email,
			});
			navigate('/main');
		} catch (error) {
			setFirebaseError(
				error.code === 'auth/invalid-credential'
					? 'Niepoprawny login lub hasło.'
					: 'Coś poszło nie tak. Spróbuj ponownie.'
			);
		}
	};

	return (
		<RedirectIfAuthenticated>
			<div className={styles.container}>
				<img src={logo} alt='CalorIQ logo' className={styles.logo} />
				<h1 className={styles.header}>
					Witaj w CalorIQ – aplikacji stworzonej, by wspierać Cię w zdrowym
					stylu życia. Poznaj swoje zapotrzebowanie kaloryczne, dodawaj spożyte
					produkty i monitoruj kalorie i makroskładniki!
				</h1>

				<div className={styles.formSection}>
					<div>
						<h3 className={styles.title}>Zaloguj się</h3>

						{firebaseError && <p className='error'>{firebaseError}</p>}

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
		</RedirectIfAuthenticated>
	);
}
