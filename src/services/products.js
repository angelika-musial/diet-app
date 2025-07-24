import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import useProductStore from '../store/useProductStore';

export const saveDailyProductsData = async (uid) => {
	const { currentDate, dailyProducts, mealsHistory } =
		useProductStore.getState();

	await setDoc(doc(db, 'users', uid, 'meals', currentDate), {
		dailyProducts,
		mealsHistory,
	});
};

export const getProductsData = async (uid, selectedDate) => {
	const docRef = doc(db, 'users', uid, 'meals', selectedDate);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const { dailyProducts, mealsHistory } = docSnap.data();

		useProductStore.setState((state) => ({
			currentDate: selectedDate,
			dailyProducts,
			mealsHistory,
			dailyHistory: {
				...state.dailyHistory,
				[selectedDate]: {
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

		useProductStore.setState((state) => ({
			currentDate: selectedDate,
			dailyProducts: [],
			mealsHistory: emptyMeals,
			dailyHistory: {
				...state.dailyHistory,
				[selectedDate]: {
					dailyProducts: [],
					mealsHistory: emptyMeals,
				},
			},
		}));
	}
};
