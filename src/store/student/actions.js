import db from '../../libs/firebase'

export function addStudent (context, student) {
  db.collection('students').add({ ...student })
    .then(docRef => {
      context.commit('addStudent', { id: docRef.id, ...student })
    })
}

export function updateStudent (context, student) {
  db.collection('students').doc(student.id)
    .set({
      name: student.name,
      document: student.document,
      modality: student.modality
    }, { merge: true })
    .then(() => {
      context.commit('updateStudent', student)
    })
}
