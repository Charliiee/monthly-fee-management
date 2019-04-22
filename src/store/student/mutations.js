export function retrieveStudents (state, students) {
  state.students = students
}

export function updateStudent (state, student) {
  const index = state.students.findIndex(item => item.id === student.id)
  if (index >= 0) {
    state.students.splice(index, 1, { ...student })
  }
}

export function addStudent (state, student) {
  state.students.push({ ...student })
}
