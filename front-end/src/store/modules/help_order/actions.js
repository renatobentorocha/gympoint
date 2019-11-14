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

export function cancelHelpOrderEditRequest() {
  return {
    type: '@help_order/CANCEL_HELP_ORDER_EDIT_REQUEST',
  };
}

export function answerHelpOrderRequest(data) {
  return {
    type: '@help_order/ANSWER_HELP_ORDER_REQUEST',
    payload: { data },
  };
}

export function answerHelpOrderSuccess(data) {
  return {
    type: '@help_order/ANSWER_HELP_ORDER_SUCCESS',
    payload: { data },
  };
}

export function HelpOrderFailure() {
  return {
    type: '@help_order/FAILURE',
  };
}
