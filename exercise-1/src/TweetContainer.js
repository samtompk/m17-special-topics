// Tweets component
import React from 'react';
import firebase from 'firebase';
import Tweet from './Tweet';
import TweetBox from './TweetBox';

var TweetContainer = React.createClass({
    getInitialState() {
        return {tweets:[]}
    },
    componentDidMount(){
        // Create a reference to a point called 'tweeets'


        // Set a listener so that, when a value changes, state is set

    },

    // Function to create a neew tweet
    createTweet(event) {
        event.preventDefault();

        // Get form info
        let tweet = {
            author:this.props.user,
            text:event.target.elements['message'].value,
            likes:0,
            time:firebase.database.ServerValue.TIMESTAMP // firebase service
        };

        // Push your tweet into your tweet reference

        event.target.reset();
    },

    // Function to like a tweet
    likeTweet(tweetId) {
        let ref = this.tweetRef.child(tweetId);
        ref.once('value').then(function(snapshot) {
            var newLikes = parseInt(snapshot.val().likes) + 1;

            // Update the number of likes on firebase

        });
    },
    render() {

        // Sort keys by likes
        let tweetKeys = Object.keys(this.state.tweets).sort((a,b) => {
            return this.state.tweets[b].likes - this.state.tweets[a].likes
        });
        return(
            <section className="container">
                <TweetBox handleSubmit={this.createTweet}/>
                {tweetKeys.map((d) => {
                    return <div>hello</div>
                })}
            </section>
        )
    }
});

export default TweetContainer;
