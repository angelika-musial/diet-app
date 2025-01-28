import styles from './Button.module.scss';

const Button = ({
	variant = 'primary',
	as: Component = 'button',
	children,
	...props
}) => {
	return (
		<Component className={`${styles.btn} ${styles[variant]}`} {...props}>
			{children}
		</Component>
	);
};

export default Button;
