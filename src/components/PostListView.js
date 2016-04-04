import React, { Component, PropTypes } from 'react';
import { browserHistory, Router, Route, Link } from 'react-router'

const commentsIcon = require('../asset/comments_counter_icon.svg');

class PostListView extends React.Component {

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

    render() {
        const self = this;
        
        console.log('this.context', this.context);
        
        return (
            <div className="viewContainer">
                <PostForm actions={self.props.actions} draftText={self.props.draftText}/>
                <div className="postList">
                    {self.props.posts.map(function(key, i) {
                        var curPost = self.props.postsById[key]
                        var path = 'post/'+ key;
                        return (
                            <div key={i} className="card postCard">
                                <p>
                                    <Link to={path}>{self.truncatePost(curPost.content)}</Link>
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

PostForm.propTypes = {
    draftText: PropTypes.string,
    rows: PropTypes.number,
    actions: PropTypes.object
};

export default PostListView;
