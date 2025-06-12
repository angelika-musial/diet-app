import { UtensilsCrossed, Coffee, Sandwich, Plus, Candy } from 'lucide-react';
import styles from './AddMealCard.module.scss';
import { useState } from 'react';
import AddProductModal from '../AddProductModal/AddProductModal';
import useProductStore from '../../store/useProductStore';
import useUserStore from '../../store/useUserStore';
import { saveDailyProductsData } from '../../services/products';

const meals = [
	{ label: 'Śniadanie', icon: <Coffee size={20} /> },
	{ label: 'Obiad', icon: <UtensilsCrossed size={20} /> },
	{ label: 'Kolacja', icon: <Sandwich size={20} /> },
	{ label: 'Przekąski', icon: <Candy size={20} /> },
];

const AddMealCard = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedMeal, setSelectedMeal] = useState(null);
	const { addProductsToDailyPanel } = useProductStore();
	const { user } = useUserStore();
	const uid = user?.uid;

	const handleOpenModal = (meal) => {
		setSelectedMeal(meal);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedMeal(null);
	};

	const handleAddProducts = async (products) => {
		addProductsToDailyPanel(selectedMeal, products);
		if (uid) {
			await saveDailyProductsData(uid);
		}
	};

	return (
		<section className={styles.card}>
			{meals.map((meal) => (
				<div key={meal.label} className={styles.mealRow}>
					<div className={styles.icon}>{meal.icon}</div>
					<p className={styles.label}>{meal.label}</p>
					<button
						className={styles.addButton}
						onClick={() => handleOpenModal(meal.label)}
					>
						<Plus size={22} />
					</button>
				</div>
			))}
			<AddProductModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				meal={selectedMeal}
				onAddProducts={handleAddProducts}
			/>
		</section>
	);
};

export default AddMealCard;
