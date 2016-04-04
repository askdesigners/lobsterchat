import { SAVE_POST, UPDATE_DRAFT, SAVE_COMMENT, UPDATE_DRAFT_COMMENT } from '../constants/ActionTypes';

export function updateDraft(draftText) {
  return {
    type: UPDATE_DRAFT,
    draftText
  };
}

export function savePost() {
  return {
    type: SAVE_POST
  };
}

export function updateDraftComment(draftCommentText) {
  return {
    type: UPDATE_DRAFT_COMMENT,
    draftCommentText
  };
}

export function saveComment(selectedPost) {
  return {
    type: SAVE_COMMENT,
    selectedPost
  };
}