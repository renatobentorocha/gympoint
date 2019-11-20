export function loadCheckInsRequest(id) {
  return {
    type: '@checkin/LOAD_CHECK_IN_REQUEST',
    payload: { id },
  };
}

export function loadCheckInsSuccess(data) {
  return {
    type: '@checkin/LOAD_CHECK_IN_SUCCESS',
    payload: { data },
  };
}

export function checkInFailure() {
  return {
    type: '@checkin/CHECK_IN_FAILURE',
  };
}
