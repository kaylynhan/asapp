import React, {useContext} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import "../App.css";


const Login = ({history}) => {

    const handleLogin = (event) => {
        //Need to add login functionality here
    }
    return(
        <div className="centered">
            <div className="row">
                <h1>Log In</h1>
                <form onSubmit={handleLogin} >
                    <label>
                        Email
                        <input name="email" type="email" placeholder="Email" />
                    </label>
                    <label>
                        Password
                        <input name="password" type="password" placeholder="Password"/>
                    </label>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    )
}

export default Login;