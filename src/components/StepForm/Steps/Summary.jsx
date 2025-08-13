import { useState } from 'react';
import Step from './Step';
import { Loader } from 'lucide-react';
import styles from '../StepForm.module.scss';
import Button from '../../Button/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { profileIsComplete } from '../../../services/profile';

export default function Summary({ loading, tdee }) {
	const [isCompleting, setIsCompleting] = useState(false);
	const [user] = useAuthState(auth);
	const navigate = useNavigate();

	const handleComplete = async () => {
		setIsCompleting(true);
		await profileIsComplete(user.uid);
		navigate('/panel');
	};

	if (loading) {
		return (
			<Step title='Jeszcze tylko chwila!'>
				<div className={styles.summaryContainer}>
					<Loader size={50} className={styles.loaderIcon} />
					<p>Wyliczamy teraz Twoje dzienne zapotrzebowanie kaloryczne...</p>
				</div>
			</Step>
		);
	}

	return (
		<Step title='Oto Twoje podsumowanie!'>
			<div className={styles.summaryContainer}>
				<p>
					Twoje zapotrzebowanie kaloryczne wynosi
					<strong> {tdee} kcal</strong>
				</p>
				<p>
					Znajomość swojego dziennego zapotrzebowania kalorycznego pozwoli Ci
					lepiej kontrolować dietę i osiągać założone cele. Dodając spożywane
					produkty w ciągu dnia, będziesz na bieżąco monitorować kalorie i
					makroskładniki, co pomoże Ci zachować świadomość żywieniową i
					wprowadzać zdrowsze nawyki!
				</p>
			</div>
			<Button
				onClick={handleComplete}
				className={styles.completeButton}
				disabled={isCompleting}
			>
				Zaczynajmy
			</Button>
		</Step>
	);
}
