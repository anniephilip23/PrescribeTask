import React, { Component } from 'react';
import fire from '../config/Fire';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fireErrors: '', //error message from firebase 
            formTitle: 'Login', //form title
            loginBtn: true //flag for registation or login button toggle
        }
    }

    // event on clicking login button
    login = e => {
        e.preventDefault();
        // authenticating user using firebase Authentication method
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch((error) => {
                this.setState({ fireErrors: error.message })
            });
    }

    // event on clicking register button
    register = e => {
        e.preventDefault();
        // Registering user using firebase Authentication method
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch((error) => {
                this.setState({ fireErrors: error.message })
            });
    }

    // changing the form title based on login button flag
    getAction = action => {
        if (action === 'reg') {
            this.setState({ formTitle: 'Register New User', loginBtn: false, fireErrors: '' });
        } else {
            this.setState({ formTitle: 'Login', loginBtn: true, fireErrors: '' });
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        // render error messages from friebase
        let errorNotification = this.state.fireErrors ?
            (<div className="Error"> {this.state.fireErrors} </div>) : null;

        // render the button based on loginbuttun state
        let submitBtn = this.state.loginBtn ?
            (<input className="loginBtn" type="submit" onClick={this.login} value="Login" />) :
            (<input className="loginBtn" type="submit" onClick={this.register} value="Register" />);

        // render the button based on loginbuttun state
        let login_register = this.state.loginBtn ?
            (<div className="div2">Don’t have an account?
            <button className="registerBtn" onClick={() => this.getAction('reg')}>Register</button>
            </div>) :
            (<div className="div2">Already have an account?
            <button className="registerBtn" onClick={() => this.getAction('login')}>Login</button>
            </div>)

        return (
            <div className="container-fluid" style={{textAlign:"center"}}>
                <div id="title"><h1>{this.state.formTitle}</h1></div>
                <div className="body">
                    <form>
                        <div className="lable">  Enter Email Id :</div>
                        {errorNotification}
                        <input type="text" value={this.state.email} onChange={this.handleChange} name="email" placeholder="email" />
                        <div className="lable2">Enter Password :</div>
                        <input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="password"/>
                        <div>{submitBtn}</div>
                    </form>
                    {login_register}
                </div>
            </div>
        )
    }
}

export default Login;