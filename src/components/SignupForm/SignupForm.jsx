import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './SignupForm.module.scss';

export default function SignupForm() {
	return (
		<div className={styles.container}>
			<form className={styles.form}>
				<h1 className={styles.header}>Załóż konto</h1>
				<Input placeholder='Imię*' type='text' id='name' name='name' required />
				<Input
					placeholder='Nazwisko*'
					type='text'
					id='surname'
					name='surname'
					required
				/>
				<Input placeholder='E-mail*' type='email' id='email' name='email' required />
				<Input
					placeholder='Hasło*'
					type='password'
					id='password'
					name='password'
					required
				/>
				<Input
					placeholder='Powtórz hasło*'
					type='password'
					id='confirmPassword'
					name='confirmPassword'
					required
				/>
				<Button type='submit' variant='primary'>
					Zarejestruj się
				</Button>
			</form>
		</div>
	);
}
