import produce from 'immer';

const INITIAL_STATE = {
  data: null,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.data = action.payload.student;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.data = null;
        break;
      }
      default:
    }
  });
}
