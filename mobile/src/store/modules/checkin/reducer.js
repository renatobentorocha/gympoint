import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function checkin(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@checkin/CHECK_IN_REQUEST':
      case '@checkin/LOAD_CHECK_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@checkin/LOAD_CHECK_IN_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@checkin/CHECK_IN_SUCCESS': {
        draft.data.push(action.payload.data);
        draft.loading = false;
        break;
      }
      case '@checkin/CLEAR_CHECK_IN_REQUEST': {
        draft.data = [];
        break;
      }
      case '@checkin/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
