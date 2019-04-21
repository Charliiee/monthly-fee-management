export function addStudent (state, student) {
  state.students.push({ ...student })
}

export function updateStudent (state, student) {
  const index = state.students.findIndex(item => item.id === student.id)
  state.students.splice(index, 1, { ...student })
}
