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
            content: "I bet you have two warring opinions of this web site’s “ethnicity” question. One is that we humans have a long history of buying clothes without explicitly considering our ancestry, so this innovation sounds, if not racist, at least racially inappropriate. The other is that, well, maybe our body types do differ by race — and just accepting this reality frees us from having to wrestle with the Caucasian body proportions that dominate most clothing design. So here’s my question: With the “ethnicity” question, is this entrepreneur courageously addressing the proposition that we’re different according to our ancestry, and propelling us toward a post-racial future? Or is he pretending to be scientific as a marketing gimmick, while actually enforcing false, outdated and possibly dangerous ideas about race? Past attempts to target clothing to an ethnicity have sparked some controversy. In 2007, for example, Nike launched a line of sneakers decorated with colorful geometric patterns and arrowhead designs for Native Americans, called Air Native N7. Native Americans had wider fore-feet, Nike claimed, and thus needed wider shoes. But from the moment he heard about the shoes, Alan Goodman, a biological anthropologist at Hampshire College in Amherst, Mass., suspected that Nike’s science was weak.",
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