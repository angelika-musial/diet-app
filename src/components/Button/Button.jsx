import styles from './Button.module.scss';
import { useNavigate } from 'react-router-dom';

const Button = ({
	variant = 'primary',
	type = 'button',
	navigateTo,
	children,
	...props
}) => {
	const navigate = useNavigate();

	const handleClick = () => {
		if (navigateTo) {
			navigate(navigateTo);
		}
		props.onClick?.();
	};

	return (
		<button
			className={`${styles.btn} ${styles[variant]}`}
			{...props}
			onClick={handleClick}
		>
			{children}
		</button>
	);
};

export default Button;
