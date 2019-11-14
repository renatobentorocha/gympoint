import produce from 'immer';

const INITIAL_STATE = {
  data: [],
};

export default function help_order(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@help_order/LOAD_HELP_ORDER_REQUEST':
      case '@help_order/SHOW_HELP_ORDER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@help_order/LOAD_HELP_ORDER_SUCCESS': {
        draft.data = action.payload.data;
        draft.editing_data = null;
        draft.loading = false;
        break;
      }
      case '@help_order/SHOW_HELP_ORDER_SUCCESS': {
        draft.editing_data = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@help_order/ADD_HELP_ORDER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@help_order/ADD_HELP_ORDER_SUCCESS': {
        draft.data.push(action.payload.data);
        draft.loading = false;
        break;
      }
      case '@help_order/EDIT_HELP_ORDER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@help_order/EDIT_HELP_ORDER_SUCCESS': {
        const { data } = action.payload;
        const index = draft.data.findIndex(s => s.id === data.id);
        draft.data[index] = data;
        draft.loading = false;
        break;
      }
      case '@help_order/DELETE_HELP_ORDER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@help_order/DELETE_HELP_ORDER_SUCCESS': {
        const { data } = action.payload;
        const index = draft.data.findIndex(p => p.id === data.id);
        draft.data.splice(index, 1);
        draft.loading = false;
        break;
      }
      case '@help_order/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
