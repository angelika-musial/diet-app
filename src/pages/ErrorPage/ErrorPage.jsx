import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

const ErrorPage = () => {

	return (
		<div className={styles.errorWrapper}>
			<div className={styles.errorBackground} />
			<h1>Ups! Coś poszło nie tak...</h1>
			<p>Nie znaleziono strony, ale Twój bilans dzienny wciąż czeka!</p>
			<Button as={Link} to='/' className={styles.errorButton}>
				Wróć na stronę główną
			</Button>
		</div>
	);
};

export default ErrorPage;
