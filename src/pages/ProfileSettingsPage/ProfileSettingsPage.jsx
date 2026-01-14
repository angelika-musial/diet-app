import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSettingsSchema } from '../../utils/validation';
import { calculateTDEE } from '../../utils/calculate';
import useUserStore from '../../store/useUserStore';
import useProductStore from '../../store/useProductStore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { toast } from 'react-hot-toast';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './ProfileSettingsPage.module.scss';
import { useNavigate } from 'react-router-dom';

const activities = [
	{ value: 1.2, label: 'Brak aktywności (tryb siedzący)' },
	{ value: 1.4, label: 'Niska aktywność (sporadyczny ruch)' },
	{
		value: 1.65,
		label: 'Średnia aktywność (amatorskie trenowanie kilka razy w tyg)',
	},
	{
		value: 1.9,
		label:
			'Wysoka aktywność (regularne uprawianie sportu)',
	},
	{
		value: 2.2,
		label: 'Bardzo wysoka aktywność (zawodowe uprawianie sportu)',
	},
];

const ProfileSettingsPage = () => {
	const { user, setUser } = useUserStore();
	const updateTodayTdee = useProductStore((s) => s.updateTodayTdee);
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState(null);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(profileSettingsSchema),
	});

	useEffect(() => {
		if (!user?.uid) return;

		const fetchUserData = async () => {
			setLoading(true);
			try {
				const snap = await getDoc(doc(db, 'users', user.uid));
				if (!snap.exists()) {
					toast.error('Nie znaleziono danych użytkownika');
					return;
				}

				const data = snap.data();
				setUserData(data);

				setValue('weight', data.weight);
				setValue('height', data.height);
				setValue('activity', data.activity);
				setValue('goal', data.goal);
			} catch (err) {
				toast.error('Błąd podczas pobierania danych');
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, [user?.uid, setValue]);

	if (loading || !userData) {
		return <p>Ładowanie danych...</p>;
	}

	const onSubmit = async (data) => {
		if (!user?.uid) {
			toast.error('Nie zalogowano użytkownika');
			return;
		}

		const newTDEE = calculateTDEE(
			user.gender,
			user.age,
			Number(data.weight),
			Number(data.height),
			Number(data.goal),
			Number(data.activity)
		);

		const updatedData = {
			...userData,
			weight: Number(data.weight),
			height: Number(data.height),
			activity: Number(data.activity),
			goal: Number(data.goal),
			tdee: newTDEE,
			updatedAt: new Date(),
		};

		try {
			await setDoc(doc(db, 'users', user.uid), updatedData, { merge: true });

			setUser({
				...user,
				...updatedData,
			});

			updateTodayTdee(newTDEE);

			toast.success('Dane zostały zaktualizowane');
			navigate('/panel');
		} catch (err) {
			console.error(err);
			toast.error('Nie udało się zapisać zmian');
		}
	};

	return (
		<div className={styles.container}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.form}
				noValidate
				aria-busy={isSubmitting}
			>
				<h1>Ustawienia profilu</h1>

				<Input
					type='number'
					label='Waga (kg)'
					{...register('weight')}
					error={errors.weight?.message}
					className={styles.input}
				/>

				<Input
					type='number'
					label='Wzrost (cm)'
					{...register('height')}
					error={errors.height?.message}
					className={styles.input}
				/>

				<div className={styles.selectWrapper}>
					<label htmlFor='activities'>Poziom aktywności fizycznej</label>
					<select
						id='activities'
						name='activities'
						{...register('activity', { valueAsNumber: true })}
					>
						{activities.map((a) => (
							<option key={a.value} value={a.value}>
								{a.label}
							</option>
						))}
					</select>
				</div>

				<div className={styles.selectWrapper}>
					<label htmlFor='goal'>Cel</label>
					<select
						id='goal'
						name='goal'
						{...register('goal', { valueAsNumber: true })}
					>
						<option value={-400}>Utrata wagi</option>
						<option value={0}>Utrzymanie wagi</option>
						<option value={400}>Zwiększenie wagi</option>
					</select>
				</div>

				<Button
					type='submit'
					disabled={isSubmitting}
					className={styles.submitButton}
				>
					Zapisz zmiany
				</Button>
			</form>
		</div>
	);
};

export default ProfileSettingsPage;
