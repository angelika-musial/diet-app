import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './SignupForm.module.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../../utils/validation';
import { registerUser } from '../../services/auth';

export default function SignupForm() {
	const navigate = useNavigate();
	const [firebaseError, setFirebaseError] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(signupSchema),
	});

	const onSubmit = async (data) => {
		try {
			await registerUser(data);

			navigate('/profile-setup');
		} catch (error) {
			setFirebaseError(
				error.code === 'auth/email-already-in-use'
					? 'Ten adres e-mail jest już zarejestrowany.'
					: 'Coś poszło nie tak. Spróbuj ponownie.'
			);
		}
	};

	return (
		<div className={styles.container}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.form}
				noValidate
				aria-busy={isSubmitting}
			>
				<h1>Załóż konto</h1>

				{firebaseError && <p className='error'>{firebaseError}</p>}

				<Input
					placeholder='Imię*'
					type='text'
					id='name'
					{...register('name')}
					error={errors.name?.message}
					className={styles.input}
				/>
				<Input
					placeholder='Nazwisko*'
					type='text'
					id='surname'
					{...register('surname')}
					error={errors.surname?.message}
					className={styles.input}
				/>
				<Input
					placeholder='E-mail*'
					type='email'
					id='email'
					{...register('email')}
					error={errors.email?.message}
					className={styles.input}
				/>
				<Input
					placeholder='Hasło*'
					type='password'
					id='password'
					{...register('password')}
					error={errors.password?.message}
					className={styles.input}
				/>
				<Input
					placeholder='Powtórz hasło*'
					type='password'
					id='confirmPassword'
					{...register('confirmPassword')}
					error={errors.confirmPassword?.message}
					className={styles.input}
				/>
				<Button
					disabled={isSubmitting}
					type='submit'
					className={styles.submitButton}
				>
					Zarejestruj się
				</Button>
			</form>
		</div>
	);
}
