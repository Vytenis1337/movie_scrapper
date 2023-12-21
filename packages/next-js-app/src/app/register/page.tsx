import { Metadata } from 'next';
import RegisterForm from 'src/components/registerForm/RegisterForm';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Register Page',
    description: 'This is the Register Page',
};

const Register = () => {
    return (
        <div className={styles.auth}>
            <RegisterForm />
        </div>
    );
};

export default Register;
