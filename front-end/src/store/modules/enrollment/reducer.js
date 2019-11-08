import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  editing_data: {},
};

export default function enrollment(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@enrollment/LOAD_ENROLLMENTS_REQUEST':
      case '@enrollment/SHOW_ENROLLMENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@enrollment/LOAD_ENROLLMENTS_SUCCESS': {
        draft.data = action.payload.data;
        draft.editing_data = null;
        draft.loading = false;
        break;
      }
      case '@enrollment/SHOW_ENROLLMENT_SUCCESS': {
        draft.editing_data = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@enrollment/ADD_ENROLLMENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@enrollment/ADD_ENROLLMENT_SUCCESS': {
        draft.data.push(action.payload.data);
        draft.loading = false;
        break;
      }
      case '@enrollment/EDIT_ENROLLMENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@enrollment/EDIT_ENROLLMENT_SUCCESS': {
        const { data } = action.payload;
        const index = draft.data.findIndex(s => s.id === data.id);
        draft.data[index] = data;
        draft.loading = false;
        break;
      }
      case '@enrollment/DELETE_ENROLLMENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@enrollment/DELETE_ENROLLMENT_SUCCESS': {
        const { data } = action.payload;
        const index = draft.data.findIndex(p => p.id === data.id);
        draft.data.splice(index, 1);
        draft.loading = false;
        break;
      }
      case '@enrollment/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
