import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './SignupForm.module.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../../utils/validation';

export default function SignupForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(signupSchema),
	});

	const onSubmit = async (data) => {
		try {
			console.log('Dane rejestracyjne:', data);
		} catch (error) {
			console.error('Błąd rejestracji:', error);
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
				<Input
					placeholder='Imię*'
					type='text'
					id='name'
					{...register('name')}
					error={errors.name?.message}
				/>
				<Input
					placeholder='Nazwisko*'
					type='text'
					id='surname'
					{...register('surname')}
					error={errors.surname?.message}
				/>
				<Input
					placeholder='E-mail*'
					type='email'
					id='email'
					{...register('email')}
					error={errors.email?.message}
				/>
				<Input
					placeholder='Hasło*'
					type='password'
					id='password'
					{...register('password')}
					error={errors.password?.message}
				/>
				<Input
					placeholder='Powtórz hasło*'
					type='password'
					id='confirmPassword'
					{...register('confirmPassword')}
					error={errors.confirmPassword?.message}
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
