import styles from '../StepForm.module.scss';
import Step from './Step';

export default function StepGender({ setFormData, formData }) {
	const handleSelectGender = (gender) => {
		setFormData((prev) => ({ ...prev, gender }));
	};

	const genders = [
		{ value: 'female', label: 'Kobieta' },
		{ value: 'male', label: 'Mężczyzna' },
	];

	return (
		<Step title='Jaka jest Twoja płeć?'>
			<div className={styles.genderButtons}>
				{genders.map((gender) => (
					<button
						key={gender.value}
						type='button'
						onClick={() => handleSelectGender(gender.value)}
						className={`${styles.genderButton} ${
							formData.gender === gender.value ? styles.active : ''
						}`}
					>
						{gender.label}
					</button>
				))}
			</div>
		</Step>
	);
}
