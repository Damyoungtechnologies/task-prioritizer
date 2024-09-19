import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../Firebase/Auth';
import { useAuth } from '../../../contextManager/authContextManager';
import './Login.css'; 
import {icon} from "../../Assets";


const SignInPage = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
                navigate("/Homepage");
            } catch (error) {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            }
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
                navigate("/Homepage");
            } catch (error) {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            }
        }
    };

    return (
        <div>
            {userLoggedIn && <Navigate to='/Homepage' replace={true} />}

            <main className="login-container">
                <div className="login-box">
                    <div className="login-header">
                        <span><img src={icon} alt="DamTasker Icon" /></span>
                        <h3>Welcome to DamTasker</h3>
                    </div>
                    <form onSubmit={handleEmailSignIn} className="login-form">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                placeholder="Enter your password"
                            />
                        </div>

                        {errorMessage && <span className="error-message">{errorMessage}</span>}

                        <button type="submit" disabled={isSigningIn ? "disabled" : null} className="submit-button">
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="login-footer">
                        Don't have an account? <Link to="/register" className="sign-up-link">Sign up</Link>
                    </p>

                    <div className="divider">OR</div>

                    <button
                        disabled={isSigningIn ? "disabled" : null}
                        onClick={handleGoogleSignIn}
                        className="google-signin-button"
                    >
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SignInPage;