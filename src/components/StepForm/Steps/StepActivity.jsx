import styles from '../StepForm.module.scss';
import Button from '../../Button/Button';

export default function StepActivity({ prevStep, setFormData, formData }) {
	return (
		<div className={styles.step}>
			<h1>Jaki jest Twój poziom aktywności fizycznej?</h1>
			<div className={styles.activityContainer}>
				<ul>
					{[
						{ value: '1.2', text: 'Brak aktywności (tryb siedzący)' },
						{ value: '1.4', text: 'Niska aktywność (sporadyczny ruch)' },
						{
							value: '1.65',
							text: 'Średnia aktywność (amatorskie trenowanie kilka razy w tygodniu)',
						},
						{
							value: '1.9',
							text: 'Wysoka aktywość (regularne uprawianie sportu o dużej intensywności)',
						},
						{
							value: '2.2',
							text: 'Bardzo wysoka aktywność (zawodowe uprawianie sportu)',
						},
					].map((option) => (
						<li key={option.value}>
							<button
								type='button'
								onClick={() =>
									setFormData({ ...formData, activity: option.value })
								}
								className={
									formData.activity === option.value ? styles.active : ''
								}
							>
								{option.text}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
