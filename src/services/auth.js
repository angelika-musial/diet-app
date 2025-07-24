import { auth, db } from './firebase';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import useProductStore from '../store/useProductStore';
import { getProductsData } from './products';
import { format } from 'date-fns';

export const loginUser = async (email, password) => {
	const userCredential = await signInWithEmailAndPassword(
		auth,
		email,
		password
	);
	const user = userCredential.user;
	const userDoc = await getDoc(doc(db, 'users', user.uid));
	const userData = userDoc.data();

	useUserStore.getState().setUser({
		uid: user.uid,
		email: user.email,
		...userData,
	});

	await getProductsData(user.uid, format(new Date(), 'yyyy-MM-dd'));

	return { user, userData };
};

export const registerUser = async ({ name, surname, email, password }) => {
	const { user } = await createUserWithEmailAndPassword(auth, email, password);
	await setDoc(doc(db, 'users', user.uid), {
		name,
		surname,
		email,
		profileComplete: false,
	});

	useProductStore.getState().logout();

	await getProductsData(user.uid, format(new Date(), 'yyyy-MM-dd'));

	return user;
};
