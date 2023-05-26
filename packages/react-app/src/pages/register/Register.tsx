import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Register.css';
import { auth } from '../../firebase/firebase';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [err, setError] = useState(null);

    const navitage = useNavigate();
    const handleRegister = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword).then((userCredential) => {
                console.log(userCredential);

                navitage('/movies');
            });
        } catch (error: any) {
            setError(error.response.data);
        }
    };

    return (
        <div className="auth">
            <form className="auth-form">
                <h1 className="auth-h1">Register</h1>

                <label className="auth-label" htmlFor="">
                    Email
                </label>
                <input
                    className="auth-input"
                    required
                    type="email"
                    placeholder="email"
                    name="email"
                    onChange={(e) => setRegisterEmail(e.target.value)}
                />

                <label className="auth-label" htmlFor="">
                    Password
                </label>
                <input
                    className="auth-input"
                    required
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button className="auth-button" onClick={handleRegister}>
                    Register
                </button>
                {err && <p>{err}</p>}
                <p>
                    Do you have an account?{' '}
                    <Link to="/login">
                        <span>Login</span>
                    </Link>
                </p>
            </form>
        </div>
    );
};
