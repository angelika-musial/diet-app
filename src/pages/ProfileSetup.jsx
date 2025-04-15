import StepForm from '../components/StepForm/StepForm';
import RedirectIfAuthenticated from '../utils/RedirectIfAuthenticated';

export default function ProfileSetup() {
	return (
		<RedirectIfAuthenticated>
			<StepForm />
		</RedirectIfAuthenticated> 
	);
}
