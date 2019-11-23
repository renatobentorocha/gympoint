import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function assistance(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@assistance/ASSISTANCE_REQUEST':
      case '@assistance/LOAD_ASSISTANCE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@assistance/LOAD_ASSISTANCE_SUCCESS': {
        draft.data = [...draft.data, ...action.payload.data];
        draft.loading = false;
        break;
      }
      case '@assistance/ASSISTANCE_SUCCESS': {
        draft.data.push(action.payload.data);
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
