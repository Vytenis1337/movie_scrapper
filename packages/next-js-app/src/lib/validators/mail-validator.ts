import { z } from 'zod';

export const MailValidator = z.object({
    name: z.string().regex(/^[a-zA-Z]+$/, { message: 'Name can only contain letters' }),
    email: z.string().email(),
    message: z.string().min(1).max(200, {
        message: 'Message cant be more than 200 characters.',
    }),
});

export type TMailValidator = z.infer<typeof MailValidator>;
