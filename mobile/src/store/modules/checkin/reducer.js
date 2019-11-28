import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
  loadingAddRequest: false,
};

export default function checkin(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@checkin/LOAD_CHECK_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@checkin/LOAD_CHECK_IN_SUCCESS': {
        if (action.payload.page === 1) {
          draft.data = action.payload.check_ins;
        } else {
          draft.data = [...draft.data, ...action.payload.check_ins];
        }
        draft.loading = false;
        break;
      }
      case '@checkin/CHECK_IN_REQUEST': {
        draft.loadingAddRequest = true;
        break;
      }
      case '@checkin/CHECK_IN_SUCCESS': {
        draft.data.push(action.payload.data);
        draft.loadingAddRequest = false;
        break;
      }
      case '@checkin/CLEAR_CHECK_IN_REQUEST': {
        draft.data = [];
        break;
      }
      case '@checkin/FAILURE': {
        draft.loading = false;
        draft.loadingAddRequest = false;
        break;
      }
      default:
    }
  });
}
