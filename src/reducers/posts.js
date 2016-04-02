import { UPDATE_DRAFT, SAVE_POST, SAVE_COMMENT } from '../constants/ActionTypes';

const initialState = {
    draftText: "",
    posts: [1, 2, 3],
    postsById: {
        1: {
            id: 1,
            content: "OMG I'm such a crustacean.",
            comments: [
                "Don't give up. Never give up",
                "And you smell like one too"
            ]
        },
        2: {
            id: 2,
            content: "OMG I'm such a crustacean.",
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
    console.log('in post reducer', action);

    switch (action.type) {
        case UPDATE_DRAFT:
            return {
                draftText: action.draftText
            };
        case SAVE_POST:
            const newId = state.posts[state.posts.length - 1].id + 1;
            const updatedposts = state.postsById;
            updatedposts[newId] = {
                id: newId,
                content: action.content,
                comments: []
            };
            return {
                posts: state.posts.concat(newId),
                postsById: updatedposts,
                draftText: ''
            };
        case SAVE_COMMENT:
            const selectedPost = state.postsById[action.selectedPost];
            selectedPost.comments.concat(action.comment);

            return {
                postsById: {
                    [selectedPost.id]: selectedPost
                }
            }
        default:
            return state;
    }
}
