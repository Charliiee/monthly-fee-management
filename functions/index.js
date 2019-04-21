const functions = require('firebase-functions')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!")
// })

exports.addStudentPayments = functions.firestore
  .document('students/{studentId}')
  .onWrite((change, context) => {
    // Retrieve the current and previous value
    const student = change.after.data()
    const previousStudentData = change.before.exists ? change.before.data() : { modality: [] }

    // We'll only update payments if modality has changed.
    // This is crucial to prevent infinite loops.
    if (student.modality.length === previousStudentData.modality.length) {
      return null
    }

    // Create sets of old and new modality lists
    const newModalitySet = new Set(student.modality)
    const oldModalitySet = new Set(student.modality)

    const allModalities = Array.from(new Set([ ...newModalities, ...oldModalitySet ]))
    allModalities.forEach((modality, index) => {
      // modality was removed
      const today = new Date()
      const dueDate = new Date(today.getFullYear(), today.getMonth(), 1)
      const payments = functions.firestore.collections('payments')
        .where('student.id', '==', student.id)
        .where('dueDate', '>=', dueDate)
        .where('paid', '==', 'false')

      if (!newModalitySet.has(modality)) {
        return payments.get()
          .then(querySnapshot => {
            const batch = functions.firestore.batch()

            // Update payment status to canceled
            querySnapshot.forEach(doc => {
              batch.update(doc.ref, { canceled: true })
            })

            return batch.commit()
          })
      }
      // modality was (re)added
      if (!oldModalitySet.has(modality)) {
        return payments.get()
          .then(querySnapshot => {

            // There's no canceled payment in the database
            // to reactivate
            if (querySnapshot.empty) {
              return false // paymentsAlreadyAdded
            }

            const batch = functions.firestore.batch()

            // Update payment status to canceled
            querySnapshot.forEach(doc => {
              batch.update(doc.ref, { canceled: false })
            })

            return batch.commit()
          })
          .then(paymentsAlreadyAdded => {
            // Create new payments to store in database
            if (!paymentsAlreadyAdded) {
              const amount = index === 0 ? 100 : 50

              // getMonth() refers to months from 0 to 11
              const remainingMonths = 11 - today.getMonth()
              for (var i = 0; i < remainingMonths; i++) {
                functions.firestore.collections('payments').add({
                  dueDate,
                  modality,
                  amount,
                  paid: false,
                  canceled: false,
                  student: {
                    id: student.id,
                    name: student.name
                  }
                })
              }
            }

            return true
          })
      }
    })

    return true
  })

exports.updateStudentPayments = functions.firestore
  .document('students/{studentId}')
  .onUpdate((change, context) => {
    // Retrieve the current and previous value
    const student = change.after.data()
    const previousStudentData = change.before.data()

    // We'll only update if the name has changed.
    // This is crucial to prevent infinite loops.
    if (student.name === previousStudentData.name) {
      return null
    }

    // Update 'student' field in all payments
    // referencing this student
    return functions.firestore.collections('payments')
      .where('student.id', '==', student.id)
      .get()
      .then(querySnapshot => {
        const batch = functions.firestore.batch()

        // Update payment status to canceled
        querySnapshot.forEach(doc => {
          batch.update(doc.ref, { 'student.name': student.name })
        })

        return batch.commit()
      })
  })
