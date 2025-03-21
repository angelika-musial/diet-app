export const calculateAge = (birthdate) => {
	const today = new Date();
	const birthdateDate = new Date(birthdate);
	let age = today.getFullYear() - birthdateDate.getFullYear();
	const monthDiff = today.getMonth() - birthdateDate.getMonth();
	const dayDiff = today.getDate() - birthdateDate.getDate();

	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		age--;
	}

	return age;
};

export const calculateTDEE = (gender, age, weight, height, goal, activity) => {
	let bmr;
	if (gender === 'male') {
		bmr = 10 * weight + 6.25 * height - 5 * age + 5;
	} else {
		bmr = 10 * weight + 6.25 * height - 5 * age - 161;
	}

	const tdee = bmr * activity;
	const adjustedTDEE = Math.round(tdee + goal);

	return adjustedTDEE;
};
