import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import styles from './CalendarDropdown.module.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useProductStore from '../../store/useProductStore';
import { parseISO, isValid, format } from 'date-fns';
import { getProductsData } from '../../services/products';
import useUserStore from '../../store/useUserStore';

const CalendarDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { setSelectedDate, currentDate } = useProductStore();
	const { user } = useUserStore();

	const toggleCalendar = () => {
		setIsOpen((prev) => !prev);
	};

	const handleDateChange = async (date) => {
		const dateStr = format(date, 'yyyy-MM-dd');
		setSelectedDate(date);
		setIsOpen(false);
		if (!user?.uid) return;

		const history = useProductStore.getState().dailyHistory[dateStr];
		if (history) {
			console.log('Dane z cache:', history);
			return;
		}

		await getProductsData(user.uid, dateStr);
	};

	const parsedDate = parseISO(currentDate);
	const safeDate = isValid(parsedDate) ? parsedDate : new Date();

	return (
		<div className={styles.wrapper}>
			<div onClick={toggleCalendar} className={styles.calendarIcon}>
				<CalendarDays size={40} />
			</div>
			{isOpen && (
				<div className={styles.dropdown}>
					<Calendar
						onChange={handleDateChange}
						value={safeDate}
						maxDate={new Date()}
					/>
				</div>
			)}
		</div>
	);
};

export default CalendarDropdown;
