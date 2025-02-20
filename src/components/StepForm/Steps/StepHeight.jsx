import styles from '../StepForm.module.scss';
import Input from '../../Input/Input';

export default function StepHeight({ setFormData, formData }) {

	const handleHeightChange = (e) => {
		const newHeight = e.target.value;
		setFormData({
			...formData,
			height: newHeight,
		});
	};

	return (
		<div className={styles.step}>
			<h1>Jaki jest Twój wzrost?</h1>
			<Input
				type='number'
				id='height'
				name='height'
				placeholder='Wzrost (cm)'
				value={formData.height || ''}
				onChange={handleHeightChange}
			/>
		</div>
	);
}
