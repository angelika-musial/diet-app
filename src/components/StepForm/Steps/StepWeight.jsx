import styles from '../StepForm.module.scss';
import Input from '../../Input/Input';

export default function StepWeight({ setFormData, formData }) {
	const handleWeightChange = (e) => {
		const newWeight = e.target.value;
		setFormData({ ...formData, weight: newWeight });
	};

	return (
		<div className={styles.step}>
			<h1>Jaka jest Twoja obecna waga?</h1>
			<Input
				type='number'
				id='weight'
				name='weight'
				placeholder='Waga (kg)'
				value={formData.weight || ''}
				onChange={handleWeightChange}
			/>
		</div>
	);
}
