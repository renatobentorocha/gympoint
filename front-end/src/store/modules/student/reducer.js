import produce from 'immer';

const INITIAL_STATE = {
  data: null,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/LOAD_STUDENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/LOAD_STUDENT_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@student/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
