import styles from '../StepForm.module.scss';
import Step from './Step';
import { ChevronRight } from 'lucide-react';

export default function StepActivity({ setFormData, formData }) {
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
				'Wysoka aktywość (regularne uprawianie sportu o dużej intensywności)',
		},
		{
			value: 2.2,
			label: 'Bardzo wysoka aktywność (zawodowe uprawianie sportu)',
		},
	];

	return (
		<Step title='Jaki jest Twój poziom aktywności fizycznej?'>
			<div className={styles.activityContainer}>
				<ul>
					{activities.map((activity) => (
						<li
							key={activity.value}
							className={
								formData.activity === activity.value ? styles.activeItem : ''
							}
						>
							{formData.activity === activity.value && (
								<ChevronRight size={24} className={styles.arrowIcon} />
							)}
							<button
								type='button'
								onClick={() =>
									setFormData((prev) => ({ ...prev, activity: activity.value }))
								}
								className={
									formData.activity === activity.value ? styles.active : ''
								}
							>
								{activity.label}
							</button>
						</li>
					))}
				</ul>
			</div>
		</Step>
	);
}
