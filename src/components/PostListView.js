import React, { Component, PropTypes } from 'react';
import { browserHistory, Router, Route, Link } from 'react-router'

const commentsIcon = require('../asset/comments_counter_icon.svg');

class PostListView extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const self = this;
        console.log('list render props', this.props)
        return (
            <div className="viewContainer">
                <PostForm actions={self.props.actions}/>
                <div className="postList">
                    {self.props.posts.map(function(key, i) {
                        var curPost = self.props.postsById[key]
                        var path = 'post/'+ key;
                        return (
                            <div key={i} className="card postCard">
                                <p>
                                    <Link to={path}>{curPost.content}</Link>
                                </p>
                                <div className="commentCounter">
                                    <img src={commentsIcon}/>
                                    {curPost.comments.length ? curPost.comments.length  + ' comments' : 'Needs your comment!' } 
                                </div>
                            </div>
                        );
                    }) }
                </div> 
            </div>
        );
    }
}


class PostForm extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    save(e) {
        console.log(this);
        this.props.actions.savePost();
    }

    updateDraft(e) {
        this.props.actions.updateDraft(e.target.value);
    }

    render() {
        return (
            <div className="card newPostForm">
                <textarea className="inputArea" placeholder="What's up crustacean?" onChange={this.updateDraft.bind(this)} ></textarea>
                <button className="chunkyButton" onClick={this.save.bind(this)}>Post!</button>
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
