import React, { Component, PropTypes } from 'react';
import { browserHistory, Router, Route, Link } from 'react-router'


class PostDetailView extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    saveComment(e) {
        if(this.props.draftCommentText !== ""){
            this.props.actions.saveComment(this.props.params.postId);
        }
    }

    updateDraftComment(e) {
        this.props.actions.updateDraftComment(e.target.value);
    }
    
    render() {
        console.log('in detail render', this.props);
        
        let activePost = this.props.postsById[this.props.params.postId];
        let { postId } = this.props.params;
        let { query } = this.props.location;
        
        return (
            <div className="viewContainer postDetail card">
                <div className="postContents">
                    <p>{activePost.content}</p>
                </div>
                <div className="commentSection">
                    <div className="commentList">
                        {activePost.comments.map(function(key, i) {
                                var curComment = activePost.comments[i]
                                return (
                                    <div key={i} className="singleComment">
                                        <p> {curComment} </p>
                                    </div>
                                );
                            }) }
                    </div>
                    <div className="commentForm">
                        <textarea className="inputArea" placeholder="Your comment..." value={this.props.draftCommentText} onChange={this.updateDraftComment.bind(this) } ></textarea>
                        <button className="chunkyButton" disabled={!this.props.draftCommentText} onClick={this.saveComment.bind(this) }>Add</button>
                    </div>
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