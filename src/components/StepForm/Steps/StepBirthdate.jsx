import styles from '../StepForm.module.scss';
import Input from '../../Input/Input';

export default function StepBirthdate({setFormData }) {
	return (
		<div className={styles.step}>
			<h1>Podaj swoją datę urodzenia</h1>
			<Input type='date' id='birthdate' name='birthdate' />
		</div>
	);
}
