import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  order: null,
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
        draft.order = null;
        draft.loading = false;
        break;
      }
      case '@help_order/SHOW_HELP_ORDER_SUCCESS': {
        draft.order = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@help_order/CANCEL_HELP_ORDER_EDIT_REQUEST': {
        draft.order = null;
        break;
      }

      case '@help_order/ANSWER_HELP_ORDER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@help_order/ANSWER_HELP_ORDER_SUCCESS': {
        draft.data = draft.data.filter(
          order => order.id !== action.payload.data.id
        );
        draft.order = null;
        draft.loading = false;
        break;
      }

      case '@help_order/FAILURE': {
        draft.data = null;
        draft.order = null;
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
