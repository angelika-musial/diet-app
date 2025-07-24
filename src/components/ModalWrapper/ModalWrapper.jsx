import { X } from 'lucide-react';
import styles from './ModalWrapper.module.scss';

const ModalWrapper = ({ isOpen, onClose, title, children, className }) => {
	return (
		<div className={`${styles.background} ${isOpen ? styles.open : ''}`}>
			<div className={`${styles.modal} ${className}`}>
				<button onClick={onClose} className={styles.closeBtn}>
					<X size={20} />
				</button>
				{title && <h2 className={styles.title}>{title}</h2>}
				<div className={styles.content}>{children}</div>
			</div>
		</div>
	);
};

export default ModalWrapper;
