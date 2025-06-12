import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import styles from './AddProductModal.module.scss';
import Button from '../Button/Button';
import Input from '../Input/Input';
import useProductStore from '../../store/useProductStore';

const cache = new Map();

const AddProductModal = ({ isOpen, onClose, onAddProducts, meal }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [products, setProducts] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [grams, setGrams] = useState('');
	const [loading, setLoading] = useState(false);
	const [noResults, setNoResults] = useState(false);

	const {
		products: addedProducts,
		addProduct,
		removeProduct,
		clearProducts,
	} = useProductStore();

	const resetState = () => {
		setSearchTerm('');
		setProducts([]);
		setSelectedProduct(null);
		setGrams('');
		setLoading(false);
		setNoResults(false);
		clearProducts();
	};

	useEffect(() => {
		if (!isOpen) {
			resetState();
		}
	}, [isOpen]);

	useEffect(() => {
		if (searchTerm.length === 0 || selectedProduct) {
			setProducts([]);
			return;
		}

		const controller = new AbortController();
		const signal = controller.signal;

		const fetchProducts = async () => {
			setLoading(true);
			setNoResults(false);

			if (cache.has(searchTerm)) {
				const cached = cache.get(searchTerm);
				setProducts(cached);
				setLoading(false);
				setNoResults(cached.length === 0);
				return;
			}

			try {
				const response = await fetch(
					`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
						searchTerm
					)}&search_simple=1&action=process&json=1`,
					{ signal }
				);

				if (!response.ok)
					throw new Error('Wystąpił błąd przy pobieraniu danych.');

				const data = await response.json();

				const term = searchTerm.toLowerCase();

				const filtered = data.products
					.filter((product) => {
						const name = (
							product.product_name_pl ||
							product.product_name ||
							''
						).toLowerCase();
						return (
							name.includes(term) && product.nutriments?.['energy-kcal_100g']
						);
					})
					.sort((a, b) => {
						const nameA = (
							a.product_name_pl ||
							a.product_name ||
							''
						).toLowerCase();
						const nameB = (
							b.product_name_pl ||
							b.product_name ||
							''
						).toLowerCase();
						const aStarts = nameA.startsWith(term);
						const bStarts = nameB.startsWith(term);
						if (aStarts === bStarts) return nameA.localeCompare(nameB);
						return aStarts ? -1 : 1;
					});

				setProducts(filtered);
				cache.set(searchTerm, filtered);
				setNoResults(filtered.length === 0);
			} catch (error) {
				if (error.name !== 'AbortError') {
					console.error('Błąd pobierania danych:', error);
					setProducts([]);
					setNoResults(true);
				}
			} finally {
				setLoading(false);
			}
		};

		const timeout = setTimeout(fetchProducts, 1000);
		return () => {
			clearTimeout(timeout);
			controller.abort();
		};
	}, [searchTerm, selectedProduct]);

	const handleAddToList = () => {
		const product =
			selectedProduct ||
			products.find((product) =>
				(product.product_name_pl || product.product_name || '')
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
			);

		if (!product || !grams) {
			alert('Musisz wpisać nazwę produktu i jego ilość.');
			return;
		}

		if (grams <= 0) {
			alert('Podaj prawidłową ilość gramów.');
			return;
		}

		const kcalPer100 = product.nutriments?.['energy-kcal_100g'];
		if (!kcalPer100) {
			alert('Brak danych o kaloriach dla tego produktu.');
			return;
		}

		const newItem = {
			id: `${product.id || product.code}-${crypto.randomUUID()}`,
			name: product.product_name_pl || product.product_name,
			grams: Number(grams),
			kcal: Math.round((kcalPer100 * grams) / 100),
			carbs: Math.round(product.nutriments.carbohydrates * (grams / 100)),
			proteins: Math.round(product.nutriments.proteins * (grams / 100)),
			fats: Math.round(product.nutriments.fat * (grams / 100)),
		};

		addProduct(newItem);
		setSelectedProduct(null);
		setGrams('');
		setSearchTerm('');
		setProducts([]);
	};

	const handleRemove = (id) => {
		removeProduct(id);
	};

	const handleSelectProduct = (product) => {
		setSelectedProduct(product);
		setSearchTerm(product.product_name_pl || product.product_name || '');
		setProducts([]);
	};

	const handleAddProducts = () => {
		onAddProducts(addedProducts);
		onClose();
	};

	const handleClose = () => {
		if (
			addedProducts.length > 0 &&
			!window.confirm('Czy na pewno chcesz opuścić panel? Utracisz dane.')
		) {
			return;
		}
		onClose();
	};

	if (!isOpen) return;

	return (
		<div className={styles.background}>
			<div className={styles.modal}>
				<button onClick={handleClose} className={styles.closeBtn}>
					<X size={20} />
				</button>

				<h2>{meal}</h2>

				<div className={styles.inputsWrapper}>
					<Input
						type='text'
						placeholder='Wpisz nazwę produktu'
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
							setSelectedProduct(null);
						}}
						className={styles.input}
					/>

					<Input
						type='number'
						placeholder='ilość (g)'
						value={grams}
						onChange={(e) => setGrams(e.target.value)}
						className={styles.gramInput}
						min={1}
					/>

					<button onClick={handleAddToList} className={styles.plusBtn}>
						<Plus size={22} />
					</button>
				</div>

				{loading && <p className={styles.info}>Ładowanie produktów...</p>}
				{!loading && noResults && (
					<p className={styles.info}>Brak wyników. Spróbuj innego hasła.</p>
				)}

				{!loading && products.length > 0 && (
					<ul className={styles.results}>
						{products.map((product) => (
							<li
								key={product.id || product.code}
								className={styles.product}
								onClick={() => handleSelectProduct(product)}
							>
								{product.product_name_pl || product.product_name}
							</li>
						))}
					</ul>
				)}

				{addedProducts.length > 0 && (
					<ul className={styles.addedList}>
						{addedProducts.map((item) => (
							<li key={item.id} className={styles.addedItem}>
								<span>{item.name}</span>
								<span>{item.grams}g</span>
								<span>{item.kcal} kcal</span>
								<button onClick={() => handleRemove(item.id)}>
									<Trash2 size={16} />
								</button>
							</li>
						))}
					</ul>
				)}

				<Button
					className={styles.addBtn}
					onClick={handleAddProducts}
					disabled={addedProducts.length === 0}
				>
					Dodaj
				</Button>
			</div>
		</div>
	);
};

export default AddProductModal;
