import React, { Component, PropTypes } from 'react';
import { browserHistory, Router, Route, Link } from 'react-router'

const commentsIcon = require('../asset/comments_counter_icon.svg');
const noPostsImg = require('../asset/blankslate_illustration_small.svg');

class PostListView extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const self = this;
        
        return (
            <div className="viewContainer">
                <PostForm actions={self.props.actions} draftText={self.props.draftText}/>
                { self.props.posts.length > 0 &&
                    <PostList posts={this.props.posts} postsById={self.props.postsById}/>
                }
                { self.props.posts.length === 0 &&
                    <div className="noPosts">
                        <img src={noPostsImg}/>
                        <p>I guess there are no posts today, yet!</p>
                    </div>
                }
            </div>
        );
    }
}


class PostForm extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    save(e) {
        if(this.props.draftText !== ""){
            this.props.actions.savePost();
        }
    }

    updateDraft(e) {
        this.props.actions.updateDraft(e.target.value);
    }

    render() {        
        return (
            <div className="card newPostForm">
                <textarea className="inputArea" value={this.props.draftText} placeholder="What's up crustacean?" onChange={this.updateDraft.bind(this)} ></textarea>
                <button className="chunkyButton" disabled={!this.props.draftText}  onClick={this.save.bind(this)}>Post!</button>
            </div>
        );
    }
}

class PostList extends React.Component {

    constructor(props, context) {
        super(props, context);
    }
    
    truncatePost(txt){
        if(txt.length > 197){
            let short = txt.slice(0, 197)
            for (var ll = short.length-1; ll > 0; ll--) {
                if(short[ll] === ' ' && short[ll-1] !== '.'){
                    short = txt.slice(0, ll);
                    break;
                }
            }
            return short + '\u2026';
        } else {
            return txt;
        }
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.posts.length !== nextProps.posts.length;       
    }
    
    navToPost(dest){
        browserHistory.push(dest);
    }

    render() {  
        let self = this;   
        return (
            <div className="postList">
                {self.props.posts.map(function(key, i) {
                    var curPost = self.props.postsById[key]
                    var path = 'post/'+ key;
                    return (
                        <div key={i} className="card postCard" onClick={self.navToPost.bind(self, path)}>
                            <p>{self.truncatePost(curPost.content)}</p>
                            <div className="commentCounter">
                                <img src={commentsIcon}/>
                                {curPost.comments.length ? curPost.comments.length  + ' comments' : 'Needs your comment!' } 
                            </div>
                        </div>
                    );
                }) }
            </div> 
        );
    }
}

PostForm.propTypes = {
    draftText: PropTypes.string,
    rows: PropTypes.number,
    actions: PropTypes.object
};

export default PostListView;
