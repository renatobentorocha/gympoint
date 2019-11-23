export function loadAssitancesRequest(id, page) {
  return {
    type: '@assistance/LOAD_ASSISTANCE_REQUEST',
    payload: { id, page },
  };
}

export function loadAssitancesSuccess(data) {
  return {
    type: '@assistance/LOAD_ASSISTANCE_SUCCESS',
    payload: { data },
  };
}

export function clearAssitanceRequest() {
  return {
    type: '@assistance/CLEAR_ASSISTANCE_REQUEST',
  };
}

export function assitanceRequest(id, question) {
  return {
    type: '@assistance/ASSISTANCE_REQUEST',
    payload: { id, question },
  };
}

export function assitanceSuccess(data) {
  return {
    type: '@assistance/ASSISTANCE_SUCCESS',
    payload: { data },
  };
}

export function assitanceFailure() {
  return {
    type: '@assistance/FAILURE',
  };
}
