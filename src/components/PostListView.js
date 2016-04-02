import React, { Component, PropTypes } from 'react';

class PostListView extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const self = this;
        return (
            <div className="viewContainer">
                <PostForm actions={self.props.actions}/>
                <div className="postList">
                    {self.props.posts.posts.map(function(key, i) {
                        var curPost = self.props.posts.postsById[key]
                        return (
                            <div key={i} className="card postCard">
                                <p>{curPost.content}</p>
                                <div className="commentCounter">
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
        this.props.actions.savePost();
    }

    updateDraft(e) {
        this.props.actions.updateDraft(e.target.value);
    }

    render() {
        return (
            <div className="card newPostForm">
                <textarea placeholder="What's up crustacean?" onChange={this.updateDraft.bind(this) } ></textarea>
                <button onClick={this.save.bind(this) }>Post!</button>
            </div>
        );
    }
}

PostForm.propTypes = {
    draftText: PropTypes.string,
    actions: PropTypes.object
};

export default PostListView;
