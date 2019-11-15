import produce from 'immer';

const INITIAL_STATE = {
  data: null,
  editing_data: {},
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/LOAD_STUDENTS_REQUEST':
      case '@student/SHOW_STUDENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/LOAD_STUDENTS_SUCCESS': {
        draft.data = action.payload.data;
        draft.editing_data = null;
        draft.loading = false;
        break;
      }
      case '@student/SHOW_STUDENT_SUCCESS': {
        draft.editing_data = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@student/ADD_STUDENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/ADD_STUDENT_SUCCESS': {
        draft.data.push(action.payload.data);
        draft.loading = false;
        break;
      }
      case '@student/EDIT_STUDENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/EDIT_STUDENT_SUCCESS': {
        const { data } = action.payload;
        const index = draft.data.findIndex(s => s.id === data.id);
        draft.data[index] = data;
        draft.loading = false;
        break;
      }
      case '@student/DELETE_STUDENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/DELETE_STUDENT_SUCCESS': {
        const { data } = action.payload;
        const index = draft.data.findIndex(s => s.id === data.id);
        draft.data.splice(index, 1);
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
