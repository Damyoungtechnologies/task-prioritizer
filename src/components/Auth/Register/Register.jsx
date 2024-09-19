import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contextManager/authContextManager';
import { doCreateUserWithEmailAndPassword } from '../../../Firebase/Auth';
import './RegisterStyles.css'; 
// Registration page - Ensure you have updateProfile
import { updateProfile } from "firebase/auth";

const Register = () => {
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { userLoggedIn } = useAuth();


const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
    }

    setErrorMessage('');
    
    if (!isRegistering) {
        setIsRegistering(true);
        try {
            // Register the user and pass the email and password
            const userCredential = await doCreateUserWithEmailAndPassword(displayName, email, password);
            
            // Update the user profile with displayName (username)
            await updateProfile(userCredential.user, {
                displayName: displayName,
            });

            // Registration successful, navigate to login page
            navigate('/login');
        } catch (err) {
            setErrorMessage(err.message);
            setIsRegistering(false);
        }
    }
};


    return (
        <>
            {userLoggedIn && (<Navigate to={'/Homepage'} replace={true} />)}

            <main className="main-container">
                <div className="form-container">
                    <div className="header">
                        <h3>Create a New Account</h3>
                    </div>
                    <form onSubmit={handleRegister} className="form-fields">
                        <div className="input-group">
                            <label>User Name</label>
                            <input
                                type="text"
                                autoComplete="displayName"
                                required
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="input-field"
                                placeholder="Enter Username"
                            />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                placeholder="Enter Email"
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                placeholder="Enter Password"
                            />
                        </div>

                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete="off"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="input-field"
                                placeholder="Confirm Password"
                            />
                        </div>

                        {errorMessage && (
                            <span className="error-message">{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering ? "disabled" : null}
                            className={`submit-button ${isRegistering ? 'disabled-button' : ''}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>

                        <div className="redirect">
                            Already have an account? {' '}
                            <Link to={'/login'} className="redirect-link">Login</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Register;
