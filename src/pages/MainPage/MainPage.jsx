import AddMealCard from '../../components/AddMealCard/AddMealCard';
import DailyGoalPanel from '../../components/DailyGoalPanel/DailyGoalPanel';
import Header from '../../components/Header/Header';
import useUserStore from '../../store/useUserStore';
import useProductStore from '../../store/useProductStore';
import styles from './MainPage.module.scss';
import { useEffect } from 'react';
import { getProductsData } from '../../services/products';

export default function MainPage() {
	const { user } = useUserStore();
	const { checkDateAndReset, isToday, currentDate } = useProductStore();

	useEffect(() => {
		checkDateAndReset();
	}, [checkDateAndReset]);

	useEffect(() => {
		if (user.uid && currentDate) {
			getProductsData(user.uid, currentDate);
		}
	}, [user.uid, currentDate]);

	return (
		<>
			<div className={styles.backgroundImage}></div>
			<div className={styles.content}>
				<Header />
				<div className={isToday ? styles.greetingWrapper : styles.noGreeting}>
					{isToday && (
						<h2 className={styles.greeting}>
							Dobrze Cię widzieć, {user.name}!
						</h2>
					)}
				</div>
				<DailyGoalPanel />
				{isToday && <AddMealCard />}
			</div>
		</>
	);
}
