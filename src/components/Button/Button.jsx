import styles from './Button.module.scss';

const Button = ({
	variant = 'primary',
	as: Component = 'button',
	className = '',
	children,
	...props
}) => {
	return (
		<Component
			className={`${styles.btn} ${styles[variant]} ${className}`}
			{...props}
		>
			{children}
		</Component>
	);
};

export default Button;
