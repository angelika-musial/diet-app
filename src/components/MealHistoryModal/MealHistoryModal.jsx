import { Trash2 } from 'lucide-react';
import useProductStore from '../../store/useProductStore';
import styles from './MealHistoryModal.module.scss';
import { saveDailyProductsData } from '../../services/products';
import useUserStore from '../../store/useUserStore';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { useState } from 'react';

const MealHistoryModal = ({ onClose, isOpen }) => {
	const { mealsHistory, removeProductFromDailyPanel, isToday } =
		useProductStore();
	const { user } = useUserStore();
	const uid = user.uid;

	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [productToDelete, setProductToDelete] = useState(null);

	const mealsArray = ['Śniadanie', 'Obiad', 'Kolacja', 'Przekąski'];

	const openConfirmModal = (mealType, productId) => {
		setProductToDelete({ mealType, productId });
		setIsConfirmOpen(true);
	};

	const confirmDelete = async () => {
		if (productToDelete) {
			removeProductFromDailyPanel(
				productToDelete.mealType,
				productToDelete.productId
			);
			if (uid) {
				await saveDailyProductsData(uid);
			}
		}
		setIsConfirmOpen(false);
		setProductToDelete(null);
	};

	const cancelDelete = () => {
		setIsConfirmOpen(false);
		setProductToDelete(null);
	};

	return (
		<>
			<ModalWrapper
				isOpen={isOpen}
				onClose={onClose}
				title='Twoja historia posiłków'
			>
				<div className={styles.mealsSection}>
					{mealsArray.map((mealType) => {
						const products = mealsHistory[mealType] || [];
						return (
							<div key={mealType} className={styles.mealSection}>
								<h3>{mealType}</h3>
								{products.length > 0 ? (
									<ul className={styles.productsList}>
										{products.map((product) => (
											<li key={product.id} className={styles.productItem}>
												<span>{product.name}</span>
												<span>{product.grams}g</span>
												<span>{product.kcal} kcal</span>
												{isToday && (
													<button
														onClick={() =>
															openConfirmModal(mealType, product.id)
														}
														className={styles.deleteBtn}
													>
														<Trash2 size={18} />
													</button>
												)}
											</li>
										))}
									</ul>
								) : (
									<p className={styles.emptyMessage}>
										Brak dodanych produktów.
									</p>
								)}
							</div>
						);
					})}
				</div>
			</ModalWrapper>

			<ConfirmModal
				isOpen={isConfirmOpen}
				message='Czy na pewno chcesz usunąć ten produkt?'
				onConfirm={confirmDelete}
				onCancel={cancelDelete}
			/>
		</>
	);
};

export default MealHistoryModal;
