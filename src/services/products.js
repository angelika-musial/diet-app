import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import useProductStore from '../store/useProductStore';
import useUserStore from '../store/useUserStore';
import { format } from 'date-fns';

export const saveDailyProductsData = async (uid) => {
	const { currentDate, dailyProducts, mealsHistory, dailyHistory } =
		useProductStore.getState();

	const todayStr = format(new Date(), 'yyyy-MM-dd');
	const isToday = currentDate === todayStr;

	const tdeeToSave = isToday
		? useUserStore.getState().user?.tdee ?? 0
		: dailyHistory[currentDate]?.tdee ?? 0;

	await setDoc(
		doc(db, 'users', uid, 'meals', currentDate),
		{
			tdee: tdeeToSave,
			dailyProducts,
			mealsHistory,
		},
		{ merge: true }
	);
};

export const getProductsData = async (uid, selectedDate) => {
	const docRef = doc(db, 'users', uid, 'meals', selectedDate);
	const docSnap = await getDoc(docRef);

	const todayStr = format(new Date(), 'yyyy-MM-dd');
	const isToday = selectedDate === todayStr;

	if (docSnap.exists()) {
		const { dailyProducts, mealsHistory, tdee } = docSnap.data();

		useProductStore.setState((state) => ({
			currentDate: selectedDate,
			dailyProducts,
			mealsHistory,
			dailyHistory: {
				...state.dailyHistory,
				[selectedDate]: {
					tdee: isToday
						? useUserStore.getState().user?.tdee ?? tdee ?? 0
						: tdee ?? 0,
					dailyProducts,
					mealsHistory,
				},
			},
		}));
	} else {
		const emptyMeals = {
			Śniadanie: [],
			Obiad: [],
			Kolacja: [],
			Przekąski: [],
		};

		const tdee = useUserStore.getState().user?.tdee ?? 0;

		await setDoc(docRef, {
			tdee,
			dailyProducts: [],
			mealsHistory: emptyMeals,
		});

		useProductStore.setState((state) => ({
			currentDate: selectedDate,
			dailyProducts: [],
			mealsHistory: emptyMeals,
			dailyHistory: {
				...state.dailyHistory,
				[selectedDate]: {
					tdee,
					dailyProducts: [],
					mealsHistory: emptyMeals,
				},
			},
		}));
	}
};
