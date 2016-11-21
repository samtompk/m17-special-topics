// Tweets component
import React from 'react';
var TweetBox = React.createClass({

    render() {
        return(
            <form onSubmit = {this.props.handleSubmit}>
                <div className="input-field col s12">
                    <input id="message" type="text" className="validate" />
                    <label htmlFor="message">Your message...</label>
                </div>
                <button type="submit" className="btn">Tweet</button>
            </form>
        )
    }
});

export default TweetBox;
