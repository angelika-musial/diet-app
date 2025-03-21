import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, 'E-mail jest wymagany')
		.trim()
		.email('Podaj poprawny adres e-mail')
		.refine((val) => !val.includes(' '), {
			message: 'Email nie może zawierać spacji',
		}),
	password: z
		.string()
		.min(1, 'Hasło jest wymagane')
		.min(8, 'Hasło musi mieć co najmniej 8 znaków')
		.refine((password) => /[@$!%*?&]/.test(password), {
			message: 'Hasło musi zawierać co najmniej jeden znak specjalny',
		}),
});

export const signupSchema = loginSchema
	.extend({
		name: z
			.string()
			.min(1, 'Imię jest wymagane')
			.trim()
			.regex(/^\p{L}+$/u, 'Imię może zawierać tylko litery'),

		surname: z
			.string()
			.min(1, 'Nazwisko jest wymagane')
			.trim()
			.regex(/^\p{L}+$/u, 'Nazwisko może zawierać tylko litery'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Hasła muszą się zgadzać',
		path: ['confirmPassword'],
	});

export const stepFormSchema = z.object({
	gender: z.string(),
	birthdate: z.string().min(1, 'Podaj datę urodzenia'),
	weight: z.preprocess(
		(val) => (val === '' || val === null ? NaN : Number(val)),
		z.number().min(1, 'Podaj prawidłową wagę').max(500, 'Podaj prawidłową wagę')
	),
	height: z.preprocess(
		(val) => (val === '' || val === null ? NaN : Number(val)),
		z
			.number()
			.min(90, 'Podaj prawidłowy wzrost')
			.max(250, 'Podaj prawidłowy wzrost')
	),
	goal: z.number(),
	activity: z.number(),
});
