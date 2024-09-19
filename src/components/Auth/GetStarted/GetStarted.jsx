import React from 'react'
import{Link} from "react-router-dom"
import {icon} from "../../Assets"
import "./GetStarted.css"
const GetStarted = () => {
  return (
    <div className="frontpage">
        <div className="startingPage">
            <h2>Welcome to DamTasker</h2>
            <img src={icon} alt="DamTasker Icon" />
            <Link to={'/login'} className="redirect-link">Get Started</Link>
        </div>
    </div>
  )
}

export default GetStarted