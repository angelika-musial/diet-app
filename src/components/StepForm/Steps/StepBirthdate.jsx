import Input from '../../Input/Input';
import Step from './Step';
import styles from '../StepForm.module.scss';

export default function StepBirthdate({ register, errors }) {
	return (
		<Step title='Podaj swoją datę urodzenia'>
			<Input
				type='date'
				id='birthdate'
				{...register('birthdate')}
				className={styles.input}
				error={errors.birthdate?.message}
			/>
		</Step>
	);
}
