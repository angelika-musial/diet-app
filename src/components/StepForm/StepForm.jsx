import { useState } from 'react';
import styles from './StepForm.module.scss';
import StepStart from './Steps/StepStart';
import StepGender from './Steps/StepGender';
import StepBirthdate from './Steps/StepBirthdate';
import StepWeight from './Steps/StepWeight';
import StepHeight from './Steps/StepHeight';
import StepActivity from './Steps/StepActivity';
import Summary from './Steps/Summary';
import StepGoal from './Steps/StepGoal';
import Button from '../Button/Button';
import { calculateTDEE } from '../../utils/calculate';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepFormSchema } from '../../utils/validation';
import { calculateAge } from '../../utils/calculate';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase';
import { saveUserProfileData } from '../../services/profile';

export default function StepForm() {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		trigger,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(stepFormSchema),
		defaultValues: {
			gender: '',
			birthdate: '',
			weight: null,
			height: null,
			goal: null,
			activity: null,
		},
	});

	const [user] = useAuthState(auth);
	const [step, setStep] = useState(0);
	const [loading, setLoading] = useState(false);
	const [tdee, setTDEE] = useState(null);

	const nextStep = async () => {
		const stepFields = [
			[],
			['gender'],
			['birthdate'],
			['weight'],
			['height'],
			['goal'],
			['activity'],
		];

		const isStepValid = await trigger(stepFields[step]);

		if (!isStepValid) return;
		setStep((prev) => prev + 1);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			step < 6 ? nextStep() : handleSubmit(onSubmit)();
		}
	};

	const isNextDisabled = () => {
		const stepConditions = {
			1: !watch('gender'),
			2: !watch('birthdate'),
			3: !watch('weight'),
			4: !watch('height'),
			5: watch('goal') === null,
			6: watch('activity') === null,
		};

		return stepConditions[step] || false;
	};

	const onSubmit = async (data) => {
		setLoading(true);
		setStep(7);

		setTimeout(async () => {
			const age = calculateAge(data.birthdate);
			const calculatedTDEE = calculateTDEE(
				data.gender,
				age,
				data.weight,
				data.height,
				data.goal,
				data.activity
			);

			const userData = {
				...data,
				tdee: calculatedTDEE,
				age,
			};

			// zapis do Firebase
			if (user) {
				await saveUserProfileData(user.uid, userData);
			}

			setTDEE(calculatedTDEE);
			setLoading(false);
		}, 4000);
	};

	return (
		<div className={styles.container}>
			<form
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
				onKeyDown={handleKeyDown}
			>
				{step === 0 && <StepStart />}
				{step === 1 && <StepGender setValue={setValue} watch={watch} />}
				{step === 2 && <StepBirthdate register={register} errors={errors} />}
				{step === 3 && <StepWeight register={register} errors={errors} />}
				{step === 4 && <StepHeight register={register} errors={errors} />}
				{step === 5 && <StepGoal setValue={setValue} watch={watch} />}
				{step === 6 && <StepActivity setValue={setValue} watch={watch} />}
				{step === 7 && <Summary loading={loading} tdee={tdee} />}

				<div className={styles.buttonsContainer}>
					{step < 6 && (
						<Button
							type='button'
							onClick={nextStep}
							className={styles.nextButton}
							disabled={isNextDisabled()}
						>
							Dalej
						</Button>
					)}

					{step === 6 && (
						<Button
							type='submit'
							className={styles.nextButton}
							disabled={isNextDisabled()}
						>
							Dalej
						</Button>
					)}
				</div>
			</form>
		</div>
	);
}
