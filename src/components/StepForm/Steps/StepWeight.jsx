import Input from '../../Input/Input';
import Step from './Step';
import styles from '../StepForm.module.scss';

export default function StepWeight({ register, errors }) {
	return (
		<Step title='Jaka jest Twoja obecna waga?'>
			<Input
				type='number'
				placeholder='Waga (kg)'
				className={styles.input}
				{...register('weight')}
				error={errors.weight?.message}
			/>
		</Step>
	);
}
