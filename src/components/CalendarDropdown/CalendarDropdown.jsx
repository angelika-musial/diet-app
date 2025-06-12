import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import styles from './CalendarDropdown.module.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useProductStore from '../../store/useProductStore';
import { parseISO, isValid } from 'date-fns';

const CalendarDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { setSelectedDate, currentDate } = useProductStore();

	const toggleCalendar = () => {
		setIsOpen((prev) => !prev);
	};

	const handleDateChange = (date) => {
		setSelectedDate(date);
		setIsOpen(false);
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
					<Calendar onChange={handleDateChange} value={safeDate} />
				</div>
			)}
		</div>
	);
};

export default CalendarDropdown;
