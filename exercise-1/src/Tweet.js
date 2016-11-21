// Tweets component
import React from 'react';
import './Tweet.css';
var Tweet = React.createClass({

    render() {
        return(
            <p className="tweetWrapper" onClick={this.props.handleClick}>
                <span className="author">{this.props.data.author}</span>
                <span className="content">{this.props.data.text}</span>
                <span className="likes">Likes:{this.props.data.likes}</span>
            </p>
        )
    }
});

export default Tweet;
