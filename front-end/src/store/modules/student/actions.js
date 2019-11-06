export function loadStudentRequest(filter) {
  return {
    type: '@student/LOAD_STUDENT_REQUEST',
    payload: { filter },
  };
}

export function loadStudentSuccess(data) {
  return {
    type: '@student/LOAD_STUDENT_SUCCESS',
    payload: { data },
  };
}

export function studentFailure() {
  return {
    type: '@student/FAILURE',
  };
}
