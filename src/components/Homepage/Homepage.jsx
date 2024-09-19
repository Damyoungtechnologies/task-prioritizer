import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contextManager/authContextManager';
import { auth } from '../../Firebase/Auth'; 
import TaskContainer from "../../TaskManager/TaskContainer";
import Footer from "./Footer";
import './HomeStyles.css'; 

const Homepage = () => {
    const { user } = useAuth();
    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                await auth.currentUser.reload();
                const updatedUser = auth.currentUser;
                setDisplayName(updatedUser.displayName || updatedUser.email);
            }
        };
        fetchUserData();
    }, [user]);

    return (
        <div className="welcome-message">
           <h4>Hello <b>{displayName}</b>, you are now logged in to DamTasker</h4>
           <TaskContainer />
           <Footer />
        </div>
    );
};

export default Homepage;
