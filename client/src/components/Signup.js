import React, {useContext} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import "../App.css";


const Signup = ({history}) => {


    const handleSignup = (event) => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        const newUser = {
            email: email.value,
            password: password.value
        }
        console.log(newUser);
        axios.post("http://localhost:4000/users/add", newUser)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }
    return(
        <div className="centered">
            <div className="row">
                <h1>Sign Up</h1>
                <form onSubmit={handleSignup} >
                    <label>
                        Email
                        <input name="email" type="email" placeholder="Email" />
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