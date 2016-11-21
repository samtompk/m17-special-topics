// Component to toggle authentication
import React from 'react';

var ToggleAuth = React.createClass({
    render() {
        // Text / buttonText options
        let text = this.props.authOption == 'sign-up' ? 'Already have an account?' : 'Need an account?'
        let buttonText = this.props.authOption == 'sign-up' ? 'Sign In' : 'Sign Up'
        return(
            <div className="container">
                <p><em>{text}</em><button onClick={this.props.handleClick} className="btn btn-primary">{buttonText}</button></p>
            </div>
        );
    }
});

export default ToggleAuth;
