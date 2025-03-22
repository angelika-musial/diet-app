import Input from '../../Input/Input';
import Step from './Step';
import styles from '../StepForm.module.scss';

export default function StepHeight({ register, errors }) {
	return (
		<Step title='Jaki jest Twój wzrost?'>
			<Input
				type='number'
				placeholder='Wzrost (cm)'
				className={styles.input}
				{...register('height')}
				error={errors.height?.message}
			/>
		</Step>
	);
}
