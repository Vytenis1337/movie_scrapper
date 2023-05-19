import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Register.css';
import { auth } from '../../firebase/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const navitage = useNavigate();
    const handleRegister = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            .then((userCredential) => {
                // Signed in

                navitage('/');
            })
            .catch((error) => {});
    };
    const goToLogin = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    };

    return (
        <div>
            <form className="register-form">
                <p className="register-form-title">
                    <span>Register</span> Form
                </p>
                <p className="register-form-req">Register or Login to see Todo List!</p>
                <input
                    className="register-input"
                    type="email"
                    placeholder="register email"
                    onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <input
                    className="register-input"
                    type="password"
                    placeholder="register password"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button type="submit" onClick={handleRegister} className="register-button">
                    Register
                </button>
                <button type="button" onClick={goToLogin} className="goToLogin-button">
                    Back to Login
                </button>
                {/* {error && <span className='main-span'>Wrong email or password!</span>} */}
            </form>
        </div>
    );
};
