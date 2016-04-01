import React from 'react';

class PostListView extends React.Component {
    
    constructor(){
        super();
        this.update = this.update.bind(this);
    }
    
    update(e){
        console.log(e.target.value);
    }
    
    render(){
        console.log(this.update)
        return (
            <div className="viewContainer">
                <PostForm save={this.update}/>
                <div className="postList">
                    posts go here
                </div>
            </div>
        );
    }
}

const PostForm = (props) => {
    console.log('inForm', props);
     
    return(
        <div className="card newPostForm">
            <textarea placeholder="What's up crustacean?" onChange={props.save}></textarea>
            <button onClick={props.save}>Post!</button>
        </div>
    );
}

export default PostListView;
