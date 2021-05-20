import React from 'react'
import SignUp from '../components/SignUp/SignUp'
import background from "./../assets/Backgrounds/Fade-In-Background.svg"

const CreateAccount = props => {
    return (
        <div style={{height:"100vh", backgroundImage:`url(${background})`, backgroundPosition: 'center', backgroundRepeat:'no-repeat', backgroundSize: '100%, 100vh'}}>
            <SignUp></SignUp>
        </div>
    )
}



export default CreateAccount
