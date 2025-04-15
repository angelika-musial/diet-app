import { db } from './firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

export const profileIsComplete = async (uid) => {
	await updateDoc(doc(db, 'users', uid), {
		profileComplete: true,
	});
};

export const saveUserProfileData = async (uid, userData) => {
	await setDoc(doc(db, 'users', uid), userData, { merge: true });
};
