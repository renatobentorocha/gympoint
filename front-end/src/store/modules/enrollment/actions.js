export function loadEnrollmentsRequest(pagination) {
  return {
    type: '@enrollment/LOAD_ENROLLMENTS_REQUEST',
    payload: { pagination },
  };
}

export function loadEnrollmentsSuccess(data) {
  return {
    type: '@enrollment/LOAD_ENROLLMENTS_SUCCESS',
    payload: { data },
  };
}

export function loadPlansRequest() {
  return {
    type: '@enrollment/LOAD_PLANS_REQUEST',
  };
}

export function loadPlansSuccess(data) {
  return {
    type: '@enrollment/LOAD_PLANS_SUCCESS',
    payload: { data },
  };
}

export function showEnrollmentRequest(id) {
  return {
    type: '@enrollment/SHOW_ENROLLMENT_REQUEST',
    payload: { id },
  };
}

export function showEnrollmentSuccess(data) {
  return {
    type: '@enrollment/SHOW_ENROLLMENT_SUCCESS',
    payload: { data },
  };
}

export function addEnrollmentRequest(data) {
  return {
    type: '@enrollment/ADD_ENROLLMENT_REQUEST',
    payload: { data },
  };
}

export function addEnrollmentsSuccess(data) {
  return {
    type: '@enrollment/ADD_ENROLLMENT_SUCCESS',
    payload: { data },
  };
}

export function editEnrollmentRequest(data) {
  return {
    type: '@enrollment/EDIT_ENROLLMENT_REQUEST',
    payload: { data },
  };
}

export function editEnrollmentSuccess(data) {
  return {
    type: '@enrollment/EDIT_ENROLLMENT_SUCCESS',
    payload: { data },
  };
}

export function deleteEnrollmentRequest(data) {
  return {
    type: '@enrollment/DELETE_ENROLLMENT_REQUEST',
    payload: { data },
  };
}

export function deleteEnrollmentSuccess(data) {
  return {
    type: '@enrollment/DELETE_ENROLLMENT_SUCCESS',
    payload: { data },
  };
}

export function enrollmentFailure() {
  return {
    type: '@enrollment/FAILURE',
  };
}
