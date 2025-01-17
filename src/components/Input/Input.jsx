import styles from './Input.module.scss';

const Input = ({ label, id, className, ...props }) => {
	return (
		<>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				className={`${styles.inputField} ${className}`}
				{...props}
			/>
		</>
	);
};

export default Input;
