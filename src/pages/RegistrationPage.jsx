import SignupForm from '../components/SignupForm/SignupForm';
import RedirectIfAuthenticated from '../utils/RedirectIfAuthenticated';

export default function RegistrationPage() {
	return (
		<RedirectIfAuthenticated>
			<SignupForm />
		</RedirectIfAuthenticated>
	);
}
