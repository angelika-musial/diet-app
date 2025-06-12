import AddMealCard from '../../components/AddMealCard/AddMealCard';
import DailyGoalPanel from '../../components/DailyGoalPanel/DailyGoalPanel';
import Header from '../../components/Header/Header';
import useUserStore from '../../store/useUserStore';
import useProductStore from '../../store/useProductStore';
import styles from './MainPage.module.scss';
import { useEffect } from 'react';

export default function MainPage() {
	const { user } = useUserStore();
	const { checkDateAndReset } = useProductStore();

	useEffect(() => {
		checkDateAndReset();
	}, []);

	return (
		<>
			<Header />
			<h2 className={styles.greeting}>Witaj {user?.name}</h2>
			<DailyGoalPanel />
			<AddMealCard />
		</>
	);
}
