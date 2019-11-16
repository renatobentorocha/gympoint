export function loadPlansRequest(pagination) {
  return {
    type: '@plan/LOAD_PLANS_REQUEST',
    payload: { pagination },
  };
}

export function loadPlansSuccess(data) {
  return {
    type: '@plan/LOAD_PLANS_SUCCESS',
    payload: { data },
  };
}

export function showPlanRequest(id) {
  return {
    type: '@plan/SHOW_PLAN_REQUEST',
    payload: { id },
  };
}

export function showPlanSuccess(data) {
  return {
    type: '@plan/SHOW_PLAN_SUCCESS',
    payload: { data },
  };
}

export function addPlanRequest(data) {
  return {
    type: '@plan/ADD_PLAN_REQUEST',
    payload: { data },
  };
}

export function addPlanSuccess(data) {
  return {
    type: '@plan/ADD_PLANS_SUCCESS',
    payload: { data },
  };
}

export function editPlanRequest(data) {
  return {
    type: '@plan/EDIT_PLAN_REQUEST',
    payload: { data },
  };
}

export function editPlanSuccess(data) {
  return {
    type: '@plan/EDIT_PLAN_SUCCESS',
    payload: { data },
  };
}

export function deletePlanRequest(data) {
  return {
    type: '@plan/DELETE_PLAN_REQUEST',
    payload: { data },
  };
}

export function deletePlanSuccess(data) {
  return {
    type: '@plan/DELETE_PLAN_SUCCESS',
    payload: { data },
  };
}

export function planFailure() {
  return {
    type: '@plan/FAILURE',
  };
}
