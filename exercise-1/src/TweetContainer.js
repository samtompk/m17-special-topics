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
        this.tweetRef = firebase.database().ref('tweets');
        // Set a listener so that, when a value changes, state is set       
        this.tweetRef.on('value', (snapshot)=> {
            if (snapshot.val()) {
                this.setState({tweets:snapshot.val()});
            }
        });
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
        this.tweetRef.push(tweet);
        event.target.reset();
    },

    // Function to like a tweet
    likeTweet(tweetId) {
        let ref = this.tweetRef.child(tweetId);
        ref.once('value').then(function(snapshot) {
            var newLikes = parseInt(snapshot.val().likes) + 1;

            // Update the number of likes on firebase
            ref.update({
                likes: newLikes
            });
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
                    return <Tweet key={d}
                        data={this.state.tweets[d]}
                        handleClick={() => this.likeTweet(d)}
                    />
                })}
            </section>
        )
    }
});

export default TweetContainer;
