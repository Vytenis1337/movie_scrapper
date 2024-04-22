'use client';
import Link from 'next/link';
import styles from './page.module.css';
import { auth } from 'src/utils/firebase';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { LoginValidator, TLoginValidator } from 'src/lib/validators/authentication-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const LoginForm = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TLoginValidator>({
        resolver: zodResolver(LoginValidator),
    });
    const router = useRouter();

    const onSubmit = async ({ email, password }: TLoginValidator) => {
        try {
            await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                toast.success(`Successfully Logged In.`);

                router.push('/');
            });
        } catch (err) {
            toast.error('Invalid email or password.');
        }
    };

    return (
        <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.login_h1}>Login</h1>
            <label className={styles.login_label} htmlFor="email">
                Email
            </label>
            <InputGroup size="lg" marginBottom={5}>
                <InputLeftElement pointerEvents="none">
                    <EmailIcon color="gray.300" boxSize={6} />
                </InputLeftElement>
                <Input {...register('email')} placeholder="you@example.com" size="lg" color="#89abe3" />
            </InputGroup>
            {}
            {}
            {errors?.email && <p>{errors.email.message}</p>}
            <label className={styles.login_label} htmlFor="">
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

            <Button disabled={isSubmitting} color="#89abe3" variant="outline" size="lg" marginTop={10} type="submit">
                {isSubmitting ? 'Loading' : 'Login'}
            </Button>
            {}
            {}
            <div className={styles.account}>
                Don't have an account yet?{' '}
                <Link as="/register" href="/register">
                    <span>Register</span>
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
