import React from 'react';
import './Signin.css';

class signIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            err:''
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onSubmitSignIn = () => {
        fetch('https://smartbrain-api-xv5t.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type':'application/JSON'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user[0].id) {
            this.props.loadUser(user);
            this.props.onRouteChange('home');
            }
            else {
                this.setState({err: user});
            }
        })  
    }

    render(){
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <p className="f6 link dim bold black db shadow-5"> {this.state.err} </p>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" name="email"  id="email"
                            onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" for="password">Password</label>
                            <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" name="password"  id="password"
                            onChange={this.onPasswordChange}
                            />
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => this.props.onRouteChange('register')} className="f6 link dim black db">register</p>
                       
                        </div>
                    </div>
                </main>
            </article>
        );
    } 
}
    

export default signIn;
