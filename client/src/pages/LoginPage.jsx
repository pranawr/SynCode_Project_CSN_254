import React from 'react'
import Login from '../components/Login/Login'
import background from "./../assets/Backgrounds/Fade-In-Background.svg"

const LoginPage = props => {
    return (
        <div style={{height:"100vh", backgroundImage:`url(${background})`, backgroundPosition: 'center', backgroundRepeat:'no-repeat', backgroundSize: '100%, 100vh'}}>
            <Login></Login>
        </div>
    )
}

export default LoginPage
