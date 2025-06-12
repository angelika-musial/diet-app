import styles from './Input.module.scss';
import { CircleAlert } from 'lucide-react';

const Input = ({ label, id, className = '', error, ...props }) => {
	return (
		<>
			<div>
				<label htmlFor={id}>{label}</label>
				{error && <p className={styles.error}><CircleAlert size={14} /> {error}</p>}
				<input
					id={id}
					className={`${styles.input} ${
						error ? styles.inputError : ''
					} ${className}`}
					{...props}
				/>
			</div>
		</>
	);
};

export default Input;
