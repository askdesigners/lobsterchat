import React, { Component, PropTypes } from 'react';

class PostListView extends React.Component {
    
    constructor(props, context){
        super(props, context);
    }
    
    render(){
        return (
            <div className="viewContainer">
                <PostForm/>
                <div className="postList">
                    posts go here
                </div>
            </div>
        );
    }
}


class PostForm extends React.Component {
    
    constructor(props, context){
        super();
        
        console.log('inform', props, context);
    }
    
    save(e){
        console.log(e.target.value);
    }
    
    updateDraft(e, a){
        console.log(e.target.value);
        this.props.actions.updateDraft(e.target.value);
    }
    
    render(){
        return (
            <div className="card newPostForm">
                <textarea placeholder="What's up crustacean?" onChange={this.updateDraft}></textarea>
                <button onClick={this.save}>Post!</button>
            </div>
        );
    }
}

PostForm.propTypes = {
  draftText: PropTypes.string,
  actions: PropTypes.object 
};

export default PostListView;
