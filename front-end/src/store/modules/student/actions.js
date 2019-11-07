export function loadStudentsRequest(filter) {
  return {
    type: '@student/LOAD_STUDENTS_REQUEST',
    payload: { filter },
  };
}

export function loadStudentsSuccess(data) {
  return {
    type: '@student/LOAD_STUDENTS_SUCCESS',
    payload: { data },
  };
}

export function showStudentRequest(id) {
  return {
    type: '@student/SHOW_STUDENT_REQUEST',
    payload: { id },
  };
}

export function showStudentSuccess(data) {
  return {
    type: '@student/SHOW_STUDENT_SUCCESS',
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

export function studentFailure() {
  return {
    type: '@student/FAILURE',
  };
}
