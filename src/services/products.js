import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import useProductStore from '../store/useProductStore';

export const saveDailyProductsData = async (uid) => {
	const { currentDate, dailyProducts, mealsHistory } =
		useProductStore.getState();

	await setDoc(doc(db, 'users', uid, 'meals', currentDate), {
		dailyProducts,
		mealsHistory,
	});
};
