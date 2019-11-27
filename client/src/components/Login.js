import React, {useState} from 'react';
import './Login.css';
import axios from 'axios';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            cPassword:"",
            showLogin: true
        };
    }

    toggleSignUp() {
        this.setState({
            showLogin: false
        });

        axios.get("http://localhost:4000/courses/allOverviews")
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err.message)
        })

        axios.get("http://localhost:4000/courses", {params: {id: "5dcf3e650636c96b37bfc810"}})
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err.message)
        })

        axios.get("http://localhost:4000/courses/getMany", {
            params: {ids: ["5dcf3e650636c96b37bfc810", "5dcf3e650636c96b37bfc819"]}
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err.message)
        })

    }

    toggleSignIn() {
        this.setState({
            showLogin: true
        });
    }

    render() {

        const { email, password, cPassword } = this.state;

        return (
            <div className='popupL'>


                <div className='popup_innerL'>

                    <h1>Login / Create account</h1>


                    <button id='loginClose' onClick={this.props.closeLogin}>
                        <img src="./Btn.png" width="20px" height="20px" alt="close me" />
                    </button>


                    <div className='loginToggle'>
                        <button className='lBtn' onClick={this.toggleSignIn.bind(this)}>Login</button>
                        <button className='lBtn' onClick={this.toggleSignUp.bind(this)}>Sign-up</button>
                    </div>


                    {this.state.showLogin ?
                        <div className='forms'>
                            <div className='loginForm'>
                                <form> {/*onSubmit={this.handleLogin}*/}

                                    {/*No for labels?*/}
                                    {/*<label htmlFor="email">Email</label>*/}

                                    <div className='inputContainer'>
                                        <input
                                            name="email"
                                            type="text"
                                            placeholder="Enter your email"
                                            className='input'
                                            //TODO
                                            //value={email}
                                            // onChange={this.handleChange}
                                        />

                                        {/*Animation border*/}
                                        <span className='border'></span>

                                    </div>
                                    {/*<label htmlFor="email">Password</label>*/}
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className='input'
                                        //value={password}
                                        //onChange={this.handleChange}
                                    />
                                    <button className='lBtn' type="submit">Login</button>
                                </form>
                            </div>
                        </div>

                        :

                        <div className='forms'>

                            <div className='createForm'>
                                <form> {/*onSubmit={this.handleCreate}*/}
                                    {/*<label htmlFor="email">Email</label>*/}
                                    <input
                                        name="email"
                                        type="text"
                                        placeholder="Enter your email"
                                        className='input'
                                        //
                                        //value={email}
                                        // onChange={this.handleChange}
                                    />
                                    {/*<label htmlFor="email">Password</label>*/}
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className='input'
                                        //value={password}
                                        //onChange={this.handleChange}
                                    />
                                    {/*<label htmlFor="email">Confirm Password</label>*/}
                                    <input
                                        name="cPassword"
                                        type="password"
                                        placeholder="Confirm your password"
                                        className='input'
                                        //value={password}
                                        //onChange={this.handleChange}
                                    />
                                    <button  className='lBtn'  type="submit">Create Account</button>
                                </form>
                            </div>


                        </div>
                    }



                </div>
            </div>
        );
    }
}

export default Login;
