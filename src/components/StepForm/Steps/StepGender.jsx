import styles from '../StepForm.module.scss';
import Step from './Step';

export default function StepGender({ setValue, watch }) {
	const genders = [
		{ value: 'female', label: 'Kobieta' },
		{ value: 'male', label: 'Mężczyzna' },
	];

	const selectedGender = watch('gender');

	return (
		<Step title='Jaka jest Twoja płeć?'>
			<div className={styles.genderButtons}>
				{genders.map((gender) => (
					<button
						key={gender.value}
						type='button'
						onClick={() => setValue('gender', gender.value)}
						className={`${styles.genderButton} ${
							selectedGender === gender.value ? styles.active : ''
						}`}
					>
						{gender.label}
					</button>
				))}
			</div>
		</Step>
	);
}
