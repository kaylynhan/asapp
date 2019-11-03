import React, {useContext} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import "../App.css";


const Signup = ({history}) => {

    const handleSignup = (event) => {
        //Need to add login functionality here
    }
    return(
        <div className="centered">
            <div className="row">
                <h1>Log In</h1>
                <form onSubmit={handleSignup} >
                    <label>
                        Email
                        <input name="email" type="email" placeHolder="Email" />
                    </label>
                    <label>
                        Password
                        <input name="password" type="password" placeholder="Password"/>
                    </label>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;