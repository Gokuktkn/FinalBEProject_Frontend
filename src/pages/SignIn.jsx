import React from 'react'
import '../css/SignForm.scss'
import NavForm from '../components/NavForm'

const SignIn = () => {
    return (
        <div className="log-form-container">
            <div className="log-form">
                <div className="nav-top">
                    <NavForm/>
                </div>
            </div>
        </div>
    )
}

export default SignIn