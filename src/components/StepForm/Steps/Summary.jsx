import Step from './Step';
import { Loader } from 'lucide-react';
import styles from '../StepForm.module.scss';
import Button from '../../Button/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { profileIsComplete } from '../../../services/profile';

export default function Summary({ loading, tdee }) {
	const navigate = useNavigate();
	const [user] = useAuthState(auth);

	const handleComplete = async () => {
		try {
			await profileIsComplete(user.uid);

			navigate('/main');
		} catch (error) {
			console.error('Failed to mark profile as complete:', error);
		}
	};

	return (
		<>
			{loading ? (
				<Step title='Jeszcze tylko chwila!'>
					<div className={styles.summaryContainer}>
						<Loader size={50} className={styles.loaderIcon} />
						<p>Wyliczamy teraz Twoje dzienne zapotrzebowanie kaloryczne...</p>
					</div>
				</Step>
			) : (
				<Step title='Oto Twoje podsumowanie!'>
					<div className={styles.summaryContainer}>
						<p>
							Twoje zapotrzebowanie kaloryczne wynosi
							<strong> {tdee} kcal</strong>
						</p>
						<p>
							Znajomość swojego dziennego zapotrzebowania kalorycznego pozwoli
							Ci świadomie zarządzać dietą i osiągać zamierzone efekty. Teraz
							wystarczy, że dobierzesz odpowiednie posiłki i będziesz cieszyć
							się lepszym samopoczuciem oraz zdrowiem każdego dnia - i to bez
							zbędnych wyrzeczeń!
						</p>
					</div>
					<Button onClick={handleComplete} className={styles.completeButton}>
						Gotowe
					</Button>
				</Step>
			)}
		</>
	);
}
