export function loadAssitancesRequest(id, page) {
  return {
    type: '@assistance/LOAD_ASSISTANCE_REQUEST',
    payload: { id, page },
  };
}

export function loadAssitancesSuccess(assistances, page) {
  return {
    type: '@assistance/LOAD_ASSISTANCE_SUCCESS',
    payload: { assistances, page },
  };
}

export function clearAssitanceRequest() {
  return {
    type: '@assistance/CLEAR_ASSISTANCE_REQUEST',
  };
}

export function addAssitanceRequest(id, question) {
  return {
    type: '@assistance/ADD_ASSISTANCE_REQUEST',
    payload: { id, question },
  };
}

export function addAssitanceSuccess() {
  return {
    type: '@assistance/ADD_ASSISTANCE_SUCCESS',
  };
}

export function assitanceFailure() {
  return {
    type: '@assistance/FAILURE',
  };
}
