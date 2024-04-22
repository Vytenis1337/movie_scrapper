'use client';

import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import Link from 'next/link';

import { auth } from 'src/utils/firebase';
import styles from './page.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterValidator, TRegisterValidator } from 'src/lib/validators/authentication-validator';
import { ZodError } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { EmailIcon } from '@chakra-ui/icons';
import { InputGroup, InputLeftElement, Input, InputRightElement, Button } from '@chakra-ui/react';
import { useState } from 'react';

const RegisterForm = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TRegisterValidator>({
        resolver: zodResolver(RegisterValidator),
    });

    const router = useRouter();

    const onSubmit = async ({ email, password }: TRegisterValidator) => {
        try {
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);

            if (signInMethods.length > 0) {
                toast.error('This email is already in use. Please use a different email.');
                reset();
                return;
            }
            await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                toast.success(`Account successfully created.`);
                router.push('/login');
                reset();
            });
        } catch (err) {
            if (err instanceof ZodError) {
                toast.error(err.issues[0].message);
                reset();
                return;
            }

            toast.error('Something went wrong. Please try again.');
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.auth_form}>
            <h1 className={styles.auth_h1}>Register</h1>

            <label className={styles.auth_label} htmlFor="email">
                Email
            </label>
            {}
            <InputGroup size="lg" marginBottom={5}>
                <InputLeftElement pointerEvents="none">
                    <EmailIcon color="gray.300" boxSize={6} />
                </InputLeftElement>
                <Input {...register('email')} placeholder="you@example.com" size="lg" color="#89abe3" />
            </InputGroup>
            {errors?.email && <p>{errors.email.message}</p>}

            <label className={styles.auth_label} htmlFor="">
                Password
            </label>
            <InputGroup size="lg">
                <Input
                    pr="4.5rem"
                    size="lg"
                    color="#89abe3"
                    type={show ? 'text' : 'password'}
                    {...register('password')}
                    placeholder="Password"
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            {}
            {errors?.password && <p>{errors.password.message}</p>}
            <label className={styles.auth_label} htmlFor="">
                Confirm Password
            </label>
            <InputGroup size="lg">
                <Input
                    pr="4.5rem"
                    size="lg"
                    type={show ? 'text' : 'password'}
                    color="#89abe3"
                    {...register('password')}
                    placeholder="Password"
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            {}
            {errors?.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            <Button disabled={isSubmitting} color="#89abe3" variant="outline" size="lg" marginTop={10} type="submit">
                {isSubmitting ? 'Loading' : 'Register'}
            </Button>
            {}

            <div className={styles.account}>
                Already have an account?{' '}
                <Link href="/login" as="/login">
                    <span>Login</span>
                </Link>
            </div>
        </form>
    );
};

export default RegisterForm;
