import React, {useState} from 'react';
import './Login.css';

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
    }

    toggleSignIn() {
        this.setState({
            showLogin: true
        });
    }

    render() {

        const { email, password, cPassword } = this.state;

        return (
            <div className='popup'>


                <div className='popup_inner'>

                    <h1>Login / Create account</h1>


                    <button id='loginClose' onClick={this.props.closeLogin}>
                        <img src="./Btn.png" width="20px" height="20px" alt="close me" />
                    </button>


                    <div className='loginToggle'>
                        <button onClick={this.toggleSignIn.bind(this)}>Login</button>
                        <button onClick={this.toggleSignUp.bind(this)}>Sign-up</button>
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
                                    <button type="submit">Login</button>
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
                                        //value={password}
                                        //onChange={this.handleChange}
                                    />
                                    <button type="submit">Create Account</button>
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
