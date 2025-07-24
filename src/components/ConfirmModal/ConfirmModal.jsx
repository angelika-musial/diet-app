import Button from '../Button/Button';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import styles from './ConfirmModal.module.scss';

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
	return (
		<ModalWrapper isOpen={isOpen} onClose={onCancel} className={styles.modal}>
			<p className={styles.message}>{message}</p>
			<div className={styles.buttons}>
				<Button
					variant='secondary'
					onClick={onCancel}
					className={styles.button}
				>
					Anuluj
				</Button>
				<Button variant='primary' onClick={onConfirm} className={styles.button}>
					Potwierdź
				</Button>
			</div>
		</ModalWrapper>
	);
};

export default ConfirmModal;
