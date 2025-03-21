import styles from '../StepForm.module.scss';
import Step from './Step';
import { ChevronRight } from 'lucide-react';

export default function StepGoal({ setValue, watch }) {
	const goals = [
		{ label: 'Utrata wagi', calorieAdjustment: -400 },
		{ label: 'Utrzymanie wagi', calorieAdjustment: 0 },
		{ label: 'Zwiększenie wagi', calorieAdjustment: 400 },
	];

	const selectedGoal = watch('goal');

	return (
		<Step title='Jaki jest Twój cel?'>
			<div className={styles.optionsContainer}>
				<ul>
					{goals.map((goal) => {
						const isActive = selectedGoal === goal.calorieAdjustment;

						return (
							<li
								key={goal.label}
								className={isActive ? styles.activeItem : ''}
							>
								{isActive && (
									<ChevronRight size={24} className={styles.arrowIcon} />
								)}
								<button
									type='button'
									onClick={() => setValue('goal', goal.calorieAdjustment)}
									className={isActive ? styles.active : ''}
								>
									{goal.label}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</Step>
	);
}
