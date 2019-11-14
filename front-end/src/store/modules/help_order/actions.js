export function loadHelpOrderRequest() {
  return {
    type: '@help_order/LOAD_HELP_ORDER_REQUEST',
  };
}

export function loadHelpOrderSuccess(data) {
  return {
    type: '@help_order/LOAD_HELP_ORDER_SUCCESS',
    payload: { data },
  };
}

export function showHelpOrderRequest(id) {
  return {
    type: '@help_order/SHOW_HELP_ORDER_REQUEST',
    payload: { id },
  };
}

export function showHelpOrderSuccess(data) {
  return {
    type: '@help_order/SHOW_HELP_ORDER_SUCCESS',
    payload: { data },
  };
}

export function addHelpOrderRequest(data) {
  return {
    type: '@help_order/ADD_HELP_ORDER_REQUEST',
    payload: { data },
  };
}

export function addHelpOrderSuccess(data) {
  return {
    type: '@help_order/ADD_HELP_ORDER_SUCCESS',
    payload: { data },
  };
}

export function editHelpOrderRequest(data) {
  return {
    type: '@help_order/EDIT_HELP_ORDER_REQUEST',
    payload: { data },
  };
}

export function editHelpOrderSuccess(data) {
  return {
    type: '@help_order/EDIT_HELP_ORDER_SUCCESS',
    payload: { data },
  };
}

export function deleteHelpOrderRequest(data) {
  return {
    type: '@help_order/DELETE_HELP_ORDER_REQUEST',
    payload: { data },
  };
}

export function deleteHelpOrderSuccess(data) {
  return {
    type: '@help_order/DELETE_HELP_ORDER_SUCCESS',
    payload: { data },
  };
}

export function HelpOrderFailure() {
  return {
    type: '@help_order/FAILURE',
  };
}
