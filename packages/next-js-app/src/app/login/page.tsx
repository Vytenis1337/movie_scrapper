import styles from './page.module.css';

import LoginForm from 'src/components/loginForm/LoginForm';

const Login = () => {
    return (
        <div className={styles.login_page}>
            <LoginForm />
        </div>
    );
};

export default Login;
