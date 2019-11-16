import produce from 'immer';

const INITIAL_STATE = {
  data: {},
  editing_data: {},
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/LOAD_PLANS_REQUEST':
      case '@plan/SHOW_PLAN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/LOAD_PLANS_SUCCESS': {
        draft.data = action.payload.data;
        draft.editing_data = null;
        draft.loading = false;
        break;
      }
      case '@plan/SHOW_PLAN_SUCCESS': {
        draft.editing_data = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@plan/ADD_PLAN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/ADD_PLAN_SUCCESS': {
        draft.data.plans.push(action.payload.data);
        draft.loading = false;
        break;
      }
      case '@plan/EDIT_PLAN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/EDIT_PLAN_SUCCESS': {
        const { data } = action.payload;
        const index = draft.data.plans.findIndex(s => s.id === data.id);
        draft.data.plans[index] = data;
        draft.loading = false;
        break;
      }
      case '@plan/DELETE_PLAN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/DELETE_PLAN_SUCCESS': {
        const { data } = action.payload;
        draft.data.plans = draft.data.plans.filter(p => p.id !== data);
        draft.loading = false;
        break;
      }
      case '@plan/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
