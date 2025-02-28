import Input from '../../Input/Input';
import Step from './Step';
import styles from '../StepForm.module.scss';

export default function StepHeight({ setFormData, formData }) {
	const handleHeightChange = (e) => {
		const height = parseFloat(e.target.value);
		setFormData((prev) => ({
			...prev,
			height,
		}));
	};

	return (
		<Step title='Jaki jest Twój wzrost?'>
			<Input
				type='number'
				id='height'
				name='height'
				placeholder='Wzrost (cm)'
				className={styles.input}
				value={formData.height || ''}
				onChange={handleHeightChange}
			/>
		</Step>
	);
}
