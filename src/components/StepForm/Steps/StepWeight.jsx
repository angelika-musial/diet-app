import Input from '../../Input/Input';
import Step from './Step';
import styles from '../StepForm.module.scss';

export default function StepWeight({ setFormData, formData }) {
	const handleWeightChange = (e) => {
		const weight = parseFloat(e.target.value);
		setFormData((prev) => ({ ...prev, weight }));
	};

	return (
		<Step title='Jaka jest Twoja obecna waga?'>
			<Input
				type='number'
				id='weight'
				name='weight'
				placeholder='Waga (kg)'
				className={styles.input}
				value={formData.weight || ''}
				onChange={handleWeightChange}
			/>
		</Step>
	);
}
