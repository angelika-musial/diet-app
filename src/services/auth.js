import { auth, db } from './firebase';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const loginUser = async (email, password) => {
	const userCredential = await signInWithEmailAndPassword(
		auth,
		email,
		password
	);
	const user = userCredential.user;
	const userDoc = await getDoc(doc(db, 'users', user.uid));
	return { user, userData: userDoc.data() };
};

export const registerUser = async ({ name, surname, email, password }) => {
	const { user } = await createUserWithEmailAndPassword(auth, email, password);
	await setDoc(doc(db, 'users', user.uid), {
		name,
		surname,
		email,
		profileComplete: false,
	});
	return user;
};
