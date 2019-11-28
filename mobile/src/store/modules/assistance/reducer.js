import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function assistance(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@assistance/ADD_ASSISTANCE_REQUEST':
      case '@assistance/LOAD_ASSISTANCE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@assistance/LOAD_ASSISTANCE_SUCCESS': {
        if (action.payload.page === 1) {
          draft.data = action.payload.assistances;
        } else {
          draft.data = [...draft.data, ...action.payload.assistances];
        }
        draft.loading = false;
        break;
      }
      case '@assistance/ADD_ASSISTANCE_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@assistance/CLEAR_ASSISTANCE_REQUEST': {
        draft.data = [];
        break;
      }
      case '@assistance/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
