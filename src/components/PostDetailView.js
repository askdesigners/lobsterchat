import React, { Component, PropTypes } from 'react';
import { browserHistory, Router, Route, Link } from 'react-router'


class PostDetailView extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    saveComment(e) {
        this.props.actions.saveComment();
    }

    updateDraftComment(e) {
        this.props.actions.updateDraftComment();
    }
    
    render() {
        console.log('in detail render', this.props);
        
        let activePost = this.props.posts.postsById[this.props.params.postId];
        let { postId } = this.props.params;
        let { query } = this.props.location;
        
        return (
            <div className="viewContainer postDetail">
                <div className="postContents">
                    <p>{activePost.content}</p>
                </div>
                <div className="commentForm">
                    <textarea placeholder="What's up crustacean?" onChange={this.updateDraftComment.bind(this) } ></textarea>
                    <button onClick={this.saveComment.bind(this) }>Post!</button>
                </div>
                <div className="commentSection">
                    {activePost.comments.map(function(key, i) {
                            var curComment = activePost.comments[i]
                            return (
                                <div key={i} className="singleComment">
                                    <p> {curComment} </p>
                                </div>
                            );
                        }) }
                </div>
            </div>
        );
    }
}

PostDetailView.propTypes = {
    comment: PropTypes.string,
    actions: PropTypes.object
};

export default PostDetailView;