import React from 'react'
import { NavLink } from 'react-router-dom';
import errorbackground from './../../assets/Backgrounds/Fade-In-Background.svg'
import warning from './../../assets/Backgrounds/warning.png'
const Errorpage = () => {
    return (
        <div style={{height:"100vh", backgroundImage:`url(${errorbackground})`, backgroundPosition: 'center', backgroundRepeat:'no-repeat', backgroundSize: '100%, 100%'}}>
            <header className="bg-dark">
                <div className="container">
                    <div className="banner-text">
                        <img src={warning} height="192px" width="192px"></img>
                        <h1 className="text-white">ERROR 404</h1>
                        <h1 className="text-white">PAGE NOT FOUND</h1>
                        <p className="banner-btn text-white">
                                <NavLink to="/">Go back to Home</NavLink>
                        </p>
                    </div>
                </div>
            </header>



        </div>
    )
}

export default Errorpage
