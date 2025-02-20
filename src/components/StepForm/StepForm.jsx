import { useState } from 'react';
import styles from './StepForm.module.scss';
import StepStart from './Steps/StepStart';
import StepGender from './Steps/StepGender';
import StepBirthdate from './Steps/StepBirthdate';
import StepWeight from './Steps/StepWeight';
import StepHeight from './Steps/StepHeight';
import StepActivity from './Steps/StepActivity';
import Button from '../Button/Button';

export default function StepForm() {
	const [step, setStep] = useState(0);
	const [formData, setFormData] = useState({
		gender: '',
		age: '',
		weight: '',
		height: '',
		activity: '',
	});

	const nextStep = () => {
		setStep((prev) => prev + 1);
	};

	const prevStep = () => {
		setStep((prev) => prev - 1);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				{step === 0 && <StepStart />}
				{step === 1 && (
					<StepGender setFormData={setFormData} formData={formData} />
				)}
				{step === 2 && <StepBirthdate setFormData={setFormData} />}
				{step === 3 && <StepWeight setFormData={setFormData} formData={formData} />}
				{step === 4 && <StepHeight setFormData={setFormData} formData={formData} />}
				{step === 5 && (
					<StepActivity setFormData={setFormData} formData={formData} />
				)}

				<div className={styles.buttonsContainer}>
					{step > 0 && (
						<Button
							type='button'
							onClick={prevStep}
							variant='secondary'
							className={styles.prevButton}
						>
							Wstecz
						</Button>
					)}

					{step < 5 && (
						<Button
							type='button'
							onClick={nextStep}
							className={styles.nextButton}
						>
							Dalej
						</Button>
					)}

					{step === 5 && (
						<Button type='submit' className={styles.nextButton}>
							Zapisz dane
						</Button>
					)}
				</div>
			</form>
		</div>
	);
}
