import React, {useState} from "react"
import "./Login.css"
import "../App.css"

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    render() {
        const { email, password } = this.state


        return (
            <div className="popup">
                <div className="popup_inner">

                    <h1>{this.props.text}</h1>



                    <button id="loginClose" onClick={this.props.closeLogin}>
                        <img src="./Btn.png" width="20px" height="20px" alt="close me" />
                    </button>


                    <div className="forms">
                        <div className="loginForm">
                            <form> {/*onSubmit={this.handleLogin}*/}
                                <label htmlFor="email">Email</label>
                                <input
                                    name="email"
                                    type="text"
                                    placeholder="Enter your email"
                                    //
                                    //value={email}
                                    // onChange={this.handleChange}
                                />
                                <label htmlFor="email">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    //value={password}
                                    //onChange={this.handleChange}
                                />
                                <button type="submit">Login</button>
                            </form>
                        </div>

                        <div className="vl"></div>

                        <div className="createForm">
                            <form> {/*onSubmit={this.handleCreate}*/}
                                <label htmlFor="email">Email</label>
                                <input
                                    name="email"
                                    type="text"
                                    placeholder="Enter your email"
                                    //
                                    //value={email}
                                    // onChange={this.handleChange}
                                />
                                <label htmlFor="email">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    //value={password}
                                    //onChange={this.handleChange}
                                />
                                <button type="submit">Create Account</button>
                            </form>
                        </div>
                    </div>



                </div>
            </div>
        )
    }
}

export default Login