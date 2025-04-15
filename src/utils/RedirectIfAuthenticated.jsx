import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const RedirectIfAuthenticated = ({ children }) => {
	const [user, loading] = useAuthState(auth);
	const [profileComplete, setProfileComplete] = useState(null);
	const location = useLocation();

	useEffect(() => {
		const checkProfile = async () => {
			if (user) {
				const docRef = doc(db, 'users', user.uid);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					setProfileComplete(docSnap.data().profileComplete);
				} else {
					setProfileComplete(false);
				}
			}
		};

		checkProfile();
	}, [user]);

	if (loading || (user && profileComplete === null)) return null;

	if (user && !profileComplete && location.pathname !== '/profile-setup') {
		return <Navigate to='/profile-setup' />;
	}

	if (user && profileComplete) return <Navigate to='/main' />;

	return children;
};

export default RedirectIfAuthenticated;
