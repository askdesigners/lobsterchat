import React, { Component, PropTypes } from 'react';
import { browserHistory, Router, Route, Link } from 'react-router';
import { If, Then, Else } from 'react-if';

class PostDetailView extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    saveComment() {
        if(this.props.draftCommentText !== ""){
            this.props.actions.saveComment(this.props.params.postId);
        }
    }
    
    _handleKey(e){
        if(e.code === 'Enter'){
            this.saveComment();
        }
    }

    componentWillMount() {
        document.addEventListener("keydown", this._handleKey.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKey.bind(this), false);
    }

    updateDraftComment(e) {
        this.props.actions.updateDraftComment(e.target.value);
    }
    
    render() {
        
        let activePost = this.props.postsById[this.props.params.postId];
        let { postId } = this.props.params;
        let { query } = this.props.location;
        
        const hasPost = activePost !== undefined;
        
        return (
            <div className="viewContainer">
                { hasPost &&
                    <div className="postDetail card">
                        <div className="postContents">
                            <p>{activePost.content}</p>
                        </div>
                        <div className="commentSection">
                            <div className="commentList">
                                {
                                    activePost.comments.map(function(key, i) {
                                        var curComment = activePost.comments[i]
                                        return (
                                            <div key={i} className="singleComment">
                                                <p> {curComment} </p>
                                            </div>
                                        );
                                    }) 
                                }
                            </div>
                            <div className="commentForm">
                                <textarea className="inputArea" placeholder="Your comment..." value={this.props.draftCommentText} onChange={this.updateDraftComment.bind(this) } ></textarea>
                                <button className="chunkyButton" disabled={!this.props.draftCommentText} onClick={this.saveComment.bind(this) }>Add <span className="hideSmall">Comment!</span></button>
                            </div>
                        </div>
                    </div>
                }
                { !hasPost && 
                    <div className="postDetail card missingPost">
                        <h3>Hmmm, it look's like that post is no longer here...</h3>
                    </div>
                }

            </div>
        );
    }
}

PostDetailView.propTypes = {
    comment: PropTypes.string,
    actions: PropTypes.object
};

export default PostDetailView;