import { UPDATE_DRAFT, SAVE_POST, UPDATE_DRAFT_COMMENT, SAVE_COMMENT } from '../constants/ActionTypes';

const initialState = {
    draftText: "",
    draftCommentText: "",
    posts: [1],
    postsById: {
        1: {
            id: 1,
            content: "This is a test post!",
            comments: []
        }
    }
};

const blankState = {
    draftText: "",
    draftCommentText: "",
    posts: [],
    postsById: {}
};

export default function posts(state = blankState, action) {

    switch (action.type) {
        case UPDATE_DRAFT:
            return {
                ...state,
                draftText: action.draftText
            };
            
        case SAVE_POST:
            var newId;
            if(state.posts.length > 0){
                newId = state.posts[0] + 1;
            } else {
                newId = 1;
            }
            let updatedposts = state.postsById;
            
            updatedposts[newId] = {
                id: newId,
                content: state.draftText,
                comments: []
            };
            return {
                posts: [newId].concat(state.posts),
                postsById: updatedposts,
                draftText: ''
            };
            
        case UPDATE_DRAFT_COMMENT:
            return {
                ...state,
                draftCommentText: action.draftCommentText
            };
            
        case SAVE_COMMENT:
            const selectedPost = state.postsById[action.selectedPost];
            let postsCopy = Object.assign({}, state.postsById);
            selectedPost.comments = selectedPost.comments.concat(state.draftCommentText);
            postsCopy[selectedPost.id] = selectedPost;
            
            return {
                ...state,
                postsById: postsCopy,
                draftCommentText: ""
            }
            
        default:
            return state;
    }
}