import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../services/firebase';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import useUserStore from '../store/useUserStore';

const ProtectedRoutes = () => {
	const [user, loading] = useAuthState(auth);
	const [profileComplete, setProfileComplete] = useState(null);
	const location = useLocation();
	const { setUser } = useUserStore();
	const { clearUser } = useUserStore();

	useEffect(() => {
		let unsubscribe;

		if (user) {
			const docRef = doc(db, 'users', user.uid);
			unsubscribe = onSnapshot(docRef, (docSnap) => {
				if (docSnap.exists()) {
					const data = docSnap.data();
					setProfileComplete(data.profileComplete);

					setUser({
						uid: user.uid,
						name: data.name,
						surname: data.surname,
						email: user.email,
						profileComplete: data.profileComplete,
						activity: data.activity,
						age: data.age,
						gender: data.gender,
						goal: data.goal,
						height: data.height,
						weight: data.weight,
						tdee: data.tdee,
						birthdate: data.birthdate,
					});
				}
			});
		} else {
			clearUser();
		}

		return () => unsubscribe && unsubscribe();
	}, [user]);

	if (loading || (user && profileComplete === null)) return null;

	if (!user) return <Navigate to='/' />;

	if (!profileComplete && location.pathname !== '/profile-setup') {
		return <Navigate to='/profile-setup' />;
	}

	return <Outlet />;
};

export default ProtectedRoutes;
