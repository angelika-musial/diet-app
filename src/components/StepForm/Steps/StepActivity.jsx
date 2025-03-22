import styles from '../StepForm.module.scss';
import Step from './Step';
import { ChevronRight } from 'lucide-react';

export default function StepActivity({ setValue, watch }) {
	const activities = [
		{ value: 1.2, label: 'Brak aktywności (tryb siedzący)' },
		{ value: 1.4, label: 'Niska aktywność (sporadyczny ruch)' },
		{
			value: 1.65,
			label: 'Średnia aktywność (amatorskie trenowanie kilka razy w tygodniu)',
		},
		{
			value: 1.9,
			label:
				'Wysoka aktywność (regularne uprawianie sportu o dużej intensywności)',
		},
		{
			value: 2.2,
			label: 'Bardzo wysoka aktywność (zawodowe uprawianie sportu)',
		},
	];

	const selectedActivity = watch('activity');

	return (
		<Step title='Jaki jest Twój poziom aktywności fizycznej?'>
			<div className={styles.optionsContainer}>
				<ul>
					{activities.map((activity) => {
						const isActive = selectedActivity === activity.value;

						return (
							<li
								key={activity.value}
								className={isActive ? styles.activeItem : ''}
							>
								{isActive && (
									<ChevronRight size={24} className={styles.arrowIcon} />
								)}
								<button
									type='button'
									onClick={() => {
										setValue('activity', activity.value);
									}}
									className={isActive ? styles.active : ''}
								>
									{activity.label}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</Step>
	);
}
