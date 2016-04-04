import { UPDATE_DRAFT, SAVE_POST, UPDATE_DRAFT_COMMENT, SAVE_COMMENT } from '../constants/ActionTypes';

const initialState = {
    draftText: "",
    draftCommentText: "",
    posts: [1, 2, 3],
    postsById: {
        1: {
            id: 1,
            content: "Hello Tortilla machine!",
            comments: [
                "Don't give up. Never give up",
                "And you smell like one too"
            ]
        },
        2: {
            id: 2,
            content: "The new tank decorations are so staid.",
            comments: [
                "Don't give up. Never give up",
                "And you smell like one too"
            ]
        },
        3: {
            id: 3,
            content: "OMG I'm such a crustacean.",
            comments: [
                "Don't give up. Never give up",
                "And you smell like one too"
            ]
        }
    }
};

export default function posts(state = initialState, action) {

    switch (action.type) {
        case UPDATE_DRAFT:
            return {
                ...state,
                draftText: action.draftText
            };
            
        case SAVE_POST:
            const newId = state.posts[state.posts.length - 1] + 1;
            const updatedposts = state.postsById;
            updatedposts[newId] = {
                id: newId,
                content: state.draftText,
                comments: []
            };
            return {
                posts: state.posts.concat(newId),
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
            console.log('in saver', postsCopy);
            
            return {
                ...state,
                postsById: postsCopy,
                draftCommentText: ""
            }
            
        default:
            return state;
    }
}