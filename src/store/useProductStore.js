import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { format } from 'date-fns';
import { auth } from '../services/firebase';
import useUserStore from './useUserStore';

const todayStr = format(new Date(), 'yyyy-MM-dd');

const initialState = {
	products: [],
	dailyProducts: [],
	mealsHistory: { Śniadanie: [], Obiad: [], Kolacja: [], Przekąski: [] },
	currentDate: todayStr,
	isToday: true,
	dailyHistory: {},
};

const actions = (set, get) => ({
	addProduct: (product) =>
		set((state) => ({ products: [...state.products, product] })),

	clearProducts: () => set({ products: [] }),

	removeProduct: (productId) =>
		set((state) => ({
			products: state.products.filter((product) => product.id !== productId),
		})),

	removeProductFromDailyPanel: (mealType, productId) =>
		set((state) => {
			const currentDate = state.currentDate;
			const dailyProducts = state.dailyProducts.filter(
				(product) => product.id !== productId
			);
			const mealsHistory = {
				...state.mealsHistory,
				[mealType]: state.mealsHistory[mealType].filter(
					(product) => product.id !== productId
				),
			};
			const dailyHistory = {
				...state.dailyHistory,
				[currentDate]: {
					...state.dailyHistory[currentDate],
					dailyProducts,
					mealsHistory,
				},
			};
			return { dailyProducts, mealsHistory, dailyHistory };
		}),

	clearMealHistory: () =>
		set({
			mealsHistory: {
				Śniadanie: [],
				Obiad: [],
				Kolacja: [],
				Przekąski: [],
			},
		}),

	addProductsToDailyPanel: (mealType, products) =>
		set((state) => {
			const productsWithDate = products.map((product) => ({
				...product,
				date: state.currentDate,
			}));

			const isToday = state.currentDate === format(new Date(), 'yyyy-MM-dd');

			const newDailyHistory = {
				...state.dailyHistory,
				[state.currentDate]: {
					tdee: isToday
						? useUserStore.getState().user?.tdee
						: state.dailyHistory[state.currentDate]?.tdee,
					dailyProducts: [
						...(state.dailyHistory[state.currentDate].dailyProducts || []),
						...productsWithDate,
					],
					mealsHistory: {
						...(state.dailyHistory[state.currentDate].mealsHistory || {
							Śniadanie: [],
							Obiad: [],
							Kolacja: [],
							Przekąski: [],
						}),
						[mealType]: [
							...(state.dailyHistory[state.currentDate].mealsHistory[
								mealType
							] || []),
							...productsWithDate,
						],
					},
				},
			};

			return {
				dailyProducts: [...state.dailyProducts, ...productsWithDate],
				mealsHistory: {
					...state.mealsHistory,
					[mealType]: [...state.mealsHistory[mealType], ...productsWithDate],
				},
				dailyHistory: newDailyHistory,
				products: [],
			};
		}),

	updateTodayTdee: (newTdee) =>
		set((state) => {
			const todayStr = format(new Date(), 'yyyy-MM-dd');

			const todayData = state.dailyHistory[todayStr];
			if (!todayData) return {};

			return {
				dailyHistory: {
					...state.dailyHistory,
					[todayStr]: {
						...todayData,
						tdee: newTdee,
					},
				},
			};
		}),

	setSelectedDate: (date) => {
		const dateStr = format(date, 'yyyy-MM-dd');
		const todayStr = format(new Date(), 'yyyy-MM-dd');
		const isToday = dateStr === todayStr;

		const existingDay = get().dailyHistory[dateStr];
		const userTdee = useUserStore.getState().user?.tdee ?? 0;

		let dayData;

		if (existingDay) {
			dayData = {
				...existingDay,
				tdee: isToday ? userTdee : existingDay.tdee,
			};
		} else {
			dayData = {
				tdee: userTdee,
				dailyProducts: [],
				mealsHistory: {
					Śniadanie: [],
					Obiad: [],
					Kolacja: [],
					Przekąski: [],
				},
			};
		}

		set((state) => ({
			currentDate: dateStr,
			isToday,
			dailyProducts: dayData.dailyProducts,
			mealsHistory: dayData.mealsHistory,
			dailyHistory: {
				...state.dailyHistory,
				[dateStr]: dayData,
			},
		}));
	},

	checkDateAndReset: () => {
		const today = format(new Date(), 'yyyy-MM-dd');
		const { currentDate } = get();

		if (currentDate !== today) {
			set(initialState, true);
		} else {
			set({ isToday: true });
		}
	},

	logout: () => {
		set(initialState);
		const uid = auth.currentUser?.uid;
		if (uid) localStorage.removeItem(`product-storage-${uid}`);
	},
});

const userStorage = createJSONStorage(() => ({
	getItem: (key) => {
		const uid = auth.currentUser?.uid;
		return uid ? localStorage.getItem(`${key}-${uid}`) : null;
	},
	setItem: (key, value) => {
		const uid = auth.currentUser?.uid;
		if (uid) localStorage.setItem(`${key}-${uid}`, value);
	},
	removeItem: (key) => {
		const uid = auth.currentUser?.uid;
		if (uid) localStorage.removeItem(`${key}-${uid}`);
	},
}));

const useProductStore = create(
	persist(
		(set, get) => ({
			...initialState,
			...actions(set, get),
		}),
		{
			name: 'product-storage',
			partialize: (state) => ({
				dailyProducts: state.dailyProducts,
				mealsHistory: state.mealsHistory,
				currentDate: state.currentDate,
				isToday: state.isToday,
				dailyHistory: state.dailyHistory,
			}),
			storage: userStorage,
		}
	)
);

export default useProductStore;
