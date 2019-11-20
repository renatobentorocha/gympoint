import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function checkin(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@checkin/LOAD_CHECK_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@checkin/LOAD_CHECK_IN_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@checkin/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
