import { SAVE_POST, UPDATE_DRAFT, SAVE_COMMENT } from '../constants/ActionTypes';

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

export function saveComment(comment) {
  return {
    type: SAVE_COMMENT,
    comment
  };
}