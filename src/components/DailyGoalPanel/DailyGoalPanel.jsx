import { calculateMacros } from '../../utils/calculate';
import styles from './DailyGoalPanel.module.scss';
import useUserStore from '../../store/useUserStore';
import useProductStore from '../../store/useProductStore';
import { useState } from 'react';
import MealHistoryModal from '../MealHistoryModal/MealHistoryModal';
import Button from '../Button/Button';
import { ClipboardList } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

const DailyGoalPanel = () => {
	const [isHistoryOpen, setIsHistoryOpen] = useState(false);
	const { user } = useUserStore();
	const { dailyProducts, currentDate, isToday, dailyHistory } =
		useProductStore();
	const dayData = dailyHistory[currentDate];
	const totalCalories = isToday && user?.tdee ? user.tdee : dayData?.tdee || 0;
	const {
		proteins: totalProteins,
		carbs: totalCarbs,
		fats: totalFats,
	} = calculateMacros(totalCalories);

	const currentCalories = dailyProducts.reduce(
		(sum, item) => sum + (item.kcal || 0),
		0
	);
	const currentCarbs = dailyProducts.reduce(
		(sum, item) => sum + (item.carbs || 0),
		0
	);
	const currentProteins = dailyProducts.reduce(
		(sum, item) => sum + (item.proteins || 0),
		0
	);
	const currentFats = dailyProducts.reduce(
		(sum, item) => sum + (item.fats || 0),
		0
	);

	const radius = 72.5;
	const circumference = 2 * Math.PI * radius;
	const progress = currentCalories / totalCalories;
	const dashOffset = circumference * (1 - progress);

	const overProgress =
		currentCalories > totalCalories
			? (currentCalories - totalCalories) / totalCalories
			: 0;
	const overDashOffset = circumference * (1 - overProgress);

	return (
		<section className={styles.panel}>
			<div className={styles.dateHeader}>
				{isToday && <p className={styles.today}>Dzisiaj</p>}
				<p className={styles.date}>
					{format(new Date(currentDate), 'EEEE, d MMMM yyyy', { locale: pl })}
				</p>
			</div>
			<div className={styles.circleWrapper}>
				<svg
					width='165'
					height='165'
					viewBox='-20.625 -20.625 206.25 206.25'
					version='1.1'
					xmlns='http://www.w3.org/2000/svg'
					style={{ transform: 'rotate(-90deg)' }}
				>
					<circle
						r={radius}
						cx='82.5'
						cy='82.5'
						fill='transparent'
						stroke='var(--light-green)'
						strokeWidth={15}
					></circle>
					<circle
						r={radius}
						cx='82.5'
						cy='82.5'
						strokeWidth={15}
						strokeLinecap='butt'
						fill='transparent'
						stroke='var(--green-color)'
						strokeDasharray={circumference}
						strokeDashoffset={dashOffset}
						style={{
							transition: 'stroke-dashoffset 0.5s ease',
						}}
					></circle>

					{overProgress && (
						<circle
							r={radius}
							cx='82.5'
							cy='82.5'
							fill='transparent'
							stroke='var(--focus-color)'
							strokeWidth={15}
							strokeDasharray={circumference}
							strokeDashoffset={overDashOffset}
							style={{
								transition: 'stroke-dashoffset 0.5s ease',
							}}
						/>
					)}

					{currentCalories >= totalCalories * 2 && (
						<circle
							r={radius}
							cx='82.5'
							cy='82.5'
							fill='transparent'
							stroke='var(--focus-color)'
							strokeWidth={15}
							strokeDasharray={circumference}
							strokeDashoffset={0}
							style={{ transition: 'stroke-dashoffset 0.5s' }}
						/>
					)}
				</svg>

				<div className={styles.circleText}>
					<p>kcal</p>
					<p>
						{currentCalories} / {totalCalories}
					</p>
				</div>
			</div>

			<div className={styles.macros}>
				<div>
					<p>Węglowodany:</p>
					<p>
						{currentCarbs} / {totalCarbs}g
					</p>
				</div>
				<div>
					<p>Białko:</p>
					<p>
						{currentProteins} / {totalProteins}g
					</p>
				</div>
				<div>
					<p>Tłuszcze:</p>
					<p>
						{currentFats} / {totalFats}g
					</p>
				</div>
			</div>

			<Button
				onClick={() => setIsHistoryOpen(true)}
				className={styles.historyButton}
				variant='secondary'
			>
				<ClipboardList size={20} />
				Zobacz historię posiłków
			</Button>

			<MealHistoryModal
				isOpen={isHistoryOpen}
				onClose={() => setIsHistoryOpen(false)}
			/>
		</section>
	);
};

export default DailyGoalPanel;
