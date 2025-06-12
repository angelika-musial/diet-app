import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format } from 'date-fns';

const useProductStore = create(
	persist(
		(set, get) => ({
			// Tymczasowe produkty w AddProductModal
			products: [],

			// Produkty dodane do DailyGoalPanel
			dailyProducts: [],

			// Historia posiłków
			mealsHistory: {
				Śniadanie: [],
				Obiad: [],
				Kolacja: [],
				Przekąski: [],
			},

			// Akcje dla tymczasowych produktów
			addProduct: (product) =>
				set((state) => ({ products: [...state.products, product] })),

			clearProducts: () => set({ products: [] }),

			removeProduct: (productId) =>
				set((state) => ({
					products: state.products.filter(
						(product) => product.id !== productId
					),
				})),

			removeProductFromDailyPanel: (mealType, productId) =>
				set((state) => ({
					dailyProducts: state.dailyProducts.filter(
						(product) => product.id !== productId
					),
					mealsHistory: {
						...state.mealsHistory,
						[mealType]: state.mealsHistory[mealType].filter(
							(product) => product.id !== productId
						),
					},
				})),

			clearMealHistory: () =>
				set({
					mealsHistory: {
						Śniadanie: [],
						Obiad: [],
						Kolacja: [],
						Przekąski: [],
					},
				}),

			currentDate: format(new Date(), 'yyyy-MM-dd'), // Aktualna data w formacie YYYY-MM-DD
			dailyHistory: {}, // Historia wszystkich dni

			// Dodanie daty do produktów przy ich dodawaniu
			addProductsToDailyPanel: (mealType, products) =>
				set((state) => {
					const productsWithDate = products.map((product) => ({
						...product,
						date: state.currentDate,
					}));

					return {
						dailyProducts: [...state.dailyProducts, ...productsWithDate],
						mealsHistory: {
							...state.mealsHistory,
							[mealType]: [
								...state.mealsHistory[mealType],
								...productsWithDate,
							],
						},
						dailyHistory: {
							...state.dailyHistory,
							[state.currentDate]: {
								dailyProducts: [
									...(state.dailyHistory[state.currentDate]?.dailyProducts ||
										[]),
									...productsWithDate,
								],
								mealsHistory: {
									...(state.dailyHistory[state.currentDate]?.mealsHistory || {
										Śniadanie: [],
										Obiad: [],
										Kolacja: [],
										Przekąski: [],
									}),
									[mealType]: [
										...(state.dailyHistory[state.currentDate]?.mealsHistory[
											mealType
										] || []),
										...productsWithDate,
									],
								},
							},
						},
						products: [],
					};
				}),

			// Zmiana daty
			setSelectedDate: (date) => {
				// lokalny czas zamiast UTC
				const dateStr = format(date, 'yyyy-MM-dd');
				set({ currentDate: dateStr });

				// Przywrócenie stanu dla wybranej daty
				const history = get().dailyHistory[dateStr] || {
					dailyProducts: [],
					mealsHistory: {
						Śniadanie: [],
						Obiad: [],
						Kolacja: [],
						Przekąski: [],
					},
				};

				set({
					dailyProducts: history.dailyProducts,
					mealsHistory: history.mealsHistory,
				});
			},

			// Reset o północy
			checkDateAndReset: () => {
				const today = format(new Date(), 'yyyy-MM-dd');
				const { currentDate } = get();

				if (currentDate !== today) {
					const newState = {
						currentDate: today,
						products: [],
						dailyProducts: [],
						mealsHistory: {
							Śniadanie: [],
							Obiad: [],
							Kolacja: [],
							Przekąski: [],
						},
					};

					set(newState);
				}
			},
		}),
		{
			name: 'product-storage',
		}
	)
);

export default useProductStore;
