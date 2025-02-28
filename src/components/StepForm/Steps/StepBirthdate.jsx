import Input from '../../Input/Input';
import Step from './Step';
import styles from '../StepForm.module.scss';

export default function StepBirthdate({ setFormData, formData }) {
	const calculateAge = (birthdate) => {
		const today = new Date();
		const birthdateDate = new Date(birthdate);

		let age = today.getFullYear() - birthdateDate.getFullYear();
		const monthDiff = today.getMonth() - birthdateDate.getMonth();
		const dayDiff = today.getDate() - birthdateDate.getDate();

		if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
			age--;
		}

		return age;
	};

	const handleChange = (e) => {
		const birthdate = e.target.value;
		const age = calculateAge(birthdate);
		setFormData((prev) => ({ ...prev, age, birthdate }));
	};

	return (
		<Step title='Podaj swoją datę urodzenia'>
			<Input
				type='date'
				id='birthdate'
				name='birthdate'
				className={styles.input}
				onChange={handleChange}
				value={formData.birthdate || ''}
			/>
		</Step>
	);
}
