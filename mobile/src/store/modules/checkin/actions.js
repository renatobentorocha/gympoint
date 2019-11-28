export function loadCheckInsRequest(id, page) {
  return {
    type: '@checkin/LOAD_CHECK_IN_REQUEST',
    payload: { id, page },
  };
}

export function loadCheckInsSuccess(check_ins, page) {
  return {
    type: '@checkin/LOAD_CHECK_IN_SUCCESS',
    payload: { check_ins, page },
  };
}

export function checkInRequest(id) {
  return {
    type: '@checkin/CHECK_IN_REQUEST',
    payload: { id },
  };
}

export function clearCheckInRequest(id) {
  return {
    type: '@checkin/CLEAR_CHECK_IN_REQUEST',
    payload: { id },
  };
}

export function checkInSuccess(data) {
  return {
    type: '@checkin/CHECK_IN_SUCCESS',
    payload: { data },
  };
}

export function checkInFailure() {
  return {
    type: '@checkin/FAILURE',
  };
}
