// Firebase twitter-like application
import React from 'react';
import firebase from 'firebase';
import FirebaseConfig from './Config';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignOut from './SignOut';
import ToggleAuth from './ToggleAuth';
import TweetContainer from './TweetContainer';
import './App.css';

// Create app
var App = React.createClass({
    getInitialState(){
        return{checked:false, user:null, authOption:'sign-in'}
    },

    // When component mounts, check the user
    componentDidMount() {
        // Initialize app
        firebase.initializeApp(FirebaseConfig);

        // Check for authentication state change (test if there is a user)
        firebase.auth().onAuthStateChanged((user) => {
            if (this.state.checked !== true) {
                if(user) {
                    this.setState({user:user})
                }
            }

            // Indicate that state has been checked
            this.setState({checked:true})
        });
    },

    // Sign up for an account
    signUp(event){
        event.preventDefault();

        // Get form values
        let email = event.target.elements['email'].value;
        let password = event.target.elements['password'].value;
        let displayName = event.target.elements['displayName'].value;

        // Remember to enable email/password authentication on Firebase!
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                user.updateProfile({
                    displayName: displayName
                }).then(() => {
                    this.setState({user:firebase.auth().currentUser});
                })
            });

        // Reset form
        event.target.reset();
    },

    // Sign into an account
    signIn (event){
        event.preventDefault();

        // Get form values
        let email = event.target.elements['email'].value;
        let password = event.target.elements['password'].value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.setState({user:firebase.auth().currentUser});
            });

        // Clear form
        event.target.reset();

    },

    // Sign out of an account
    signOut() {
        firebase.auth().signOut().then(() => {
            this.setState({user:null});
        });
    },

    // Toggle between 'sign-up' and 'sign-in'
    toggleLogin() {
        let option = this.state.authOption == 'sign-in' ? 'sign-up' : 'sign-in';
        this.setState({authOption:option});
    },

    render() {

        // Determine which 'authenticate' component should be shown
        if(this.state.authOption == 'sign-up') {
            var authComponent = <SignUp submit={this.signUp}/>
        }
        else {
            var authComponent = <SignIn submit={this.signIn}/>
        }
        return(
            <div>
                {!this.state.user &&
                    <div>
                        {authComponent}
                        <ToggleAuth handleClick={this.toggleLogin} authOption={this.state.authOption} />
                    </div>

                }
                {this.state.user &&
                    <section>
                        <SignOut submit={this.signOut}/>
                        <TweetContainer user = {this.state.user.displayName}/>
                    </section>
                }
            </div>

        )
    }
});
export default App;
