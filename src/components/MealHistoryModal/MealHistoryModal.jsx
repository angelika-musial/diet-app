import { X, Trash2 } from 'lucide-react';
import useProductStore from '../../store/useProductStore';
import styles from './MealHistoryModal.module.scss';
import { saveDailyProductsData } from '../../services/products';
import useUserStore from '../../store/useUserStore';

const MealHistoryModal = ({ onClose, isOpen }) => {
	const { mealsHistory, removeProductFromDailyPanel } = useProductStore();
	const { user } = useUserStore();
	const uid = user?.uid;

	if (!isOpen) return null;

	const handleRemoveProduct = async (mealType, productId) => {
		removeProductFromDailyPanel(mealType, productId);
		if (uid) {
			await saveDailyProductsData(uid);
		}
	};

	return (
		<div className={styles.background}>
			<div className={styles.modal}>
				<button onClick={onClose} className={styles.closeBtn}>
					<X size={20} />
				</button>

				<h2>Twoja historia posiłków</h2>

				<div className={styles.mealsSection}>
					{Object.entries(mealsHistory).map(([mealType, products]) => (
						<div key={mealType} className={styles.mealSection}>
							<h3>{mealType}</h3>
							{products.length > 0 ? (
								<ul className={styles.productsList}>
									{products.map((product) => (
										<li key={product.id} className={styles.productItem}>
											<span>{product.name}</span>
											<span>{product.grams}g</span>
											<span>{product.kcal} kcal</span>
											<button
												onClick={() =>
													handleRemoveProduct(mealType, product.id)
												}
												className={styles.deleteBtn}
											>
												<Trash2 size={18} />
											</button>
										</li>
									))}
								</ul>
							) : (
								<p className={styles.emptyMessage}>Brak dodanych produktów.</p>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MealHistoryModal;
