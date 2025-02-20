import styles from '../StepForm.module.scss';

export default function StepStart() {
	return (
		<div className={styles.step}>
			<h1>Już prawie gotowe!</h1>
			<p>
				Potrzebujemy kilku dodatkowych informacji, aby dokładnie obliczyć Twoje
				dzienne zapotrzebowanie kaloryczne. W kolejnych krokach poprosimy Cię o
				podanie płci, daty urodzenia, wagi, wzrostu oraz poziomu aktywności
				fizycznej. Dzięki temu dostosujemy wyniki idealnie do Twoich potrzeb!
			</p>
		</div>
	);
}
