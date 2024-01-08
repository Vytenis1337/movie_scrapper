import { z } from 'zod';

export const RegisterValidator = z
    .object({
        email: z.string().email(),
        password: z.string().min(8, {
            message: 'Password must be at least 8 characters long.',
        }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
    });

export type TRegisterValidator = z.infer<typeof RegisterValidator>;

export const LoginValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters long.',
    }),
});

export type TLoginValidator = z.infer<typeof LoginValidator>;
