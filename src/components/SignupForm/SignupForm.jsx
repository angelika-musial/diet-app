import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './SignupForm.module.scss';

export default function SignupForm() {
	return (
		<div className={styles.container}>
			<form className={styles.form}>
				<h1>Załóż konto</h1>
				<Input label='Imię' type='text' id='name' name='name' required />
				<Input
					label='Nazwisko'
					type='text'
					id='surname'
					name='surname'
					required
				/>
				<Input label='E-mail' type='email' id='email' name='email' required />
				<Input
					label='Hasło'
					type='password'
					id='password'
					name='password'
					required
				/>
				<Button type='submit' variant='primary'>
					Zarejestruj się
				</Button>
			</form>
		</div>
	);
}
