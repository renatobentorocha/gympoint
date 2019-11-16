export function loadStudentsRequest(filter, pagination) {
  return {
    type: '@student/LOAD_STUDENTS_REQUEST',
    payload: { filter, pagination },
  };
}

export function loadStudentsSuccess(data) {
  return {
    type: '@student/LOAD_STUDENTS_SUCCESS',
    payload: { data },
  };
}

export function addStudentRequest(data) {
  return {
    type: '@student/ADD_STUDENT_REQUEST',
    payload: { data },
  };
}

export function addStudentSuccess(data) {
  return {
    type: '@student/ADD_STUDENT_SUCCESS',
    payload: { data },
  };
}

export function editStudentRequest(data) {
  return {
    type: '@student/EDIT_STUDENT_REQUEST',
    payload: { data },
  };
}

export function editStudentSuccess(data) {
  return {
    type: '@student/EDIT_STUDENT_SUCCESS',
    payload: { data },
  };
}

export function deleteStudentRequest(data) {
  return {
    type: '@student/DELETE_STUDENT_REQUEST',
    payload: { data },
  };
}

export function deleteStudentSuccess(data) {
  return {
    type: '@student/DELETE_STUDENT_SUCCESS',
    payload: { data },
  };
}

export function studentFailure() {
  return {
    type: '@student/FAILURE',
  };
}
