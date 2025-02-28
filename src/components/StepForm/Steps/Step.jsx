import styles from '../StepForm.module.scss';

export default function Step({ title, children }) {
	return (
		<div>
			<h1 className={styles.stepTitle}>{title}</h1>
			<div className={styles.divider}></div>
			<div className={styles.stepContent}>{children}</div>
		</div>
	);
}
