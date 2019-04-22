import db from '../../libs/firebase'

export function retrieveStudents (context) {
  db.collection('students').get()
    .then(querySnapshot => {
      const tempStudents = []
      querySnapshot.forEach(doc => {
        const docData = doc.data()
        tempStudents.push({
          id: doc.id,
          name: docData.name,
          document: docData.document,
          modality: docData.modality
        })
      })

      const studentsSorted = tempStudents.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })

      context.commit('retrieveStudents', studentsSorted)
    })
}

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
