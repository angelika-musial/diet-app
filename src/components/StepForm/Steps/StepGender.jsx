import styles from '../StepForm.module.scss';
import { useState } from 'react';

export default function StepGender({
	setFormData,
	formData,
}) {
	const [selectedGender, setSelectedGender] = useState(formData.gender);

	const handleSelectGender = (gender) => {
		setSelectedGender(gender);
		setFormData({ ...formData, gender });
	};

	return (
		<div className={styles.step}>
			<h1>Jaka jest twoja płeć?</h1>
			<div className={styles.genderButtons}>
				<button
					type='button'
					onClick={() => handleSelectGender('female')}
					className={`${styles.genderButton} ${
						selectedGender === 'female' ? styles.active : ''
					}`}
				>
					Kobieta
				</button>
				<button
					type='button'
					onClick={() => handleSelectGender('male')}
					className={`${styles.genderButton} ${
						selectedGender === 'male' ? styles.active : ''
					}`}
				>
					Mężczyzna
				</button>
			</div>
		</div>
	);
}
