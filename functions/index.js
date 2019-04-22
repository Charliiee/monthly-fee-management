const functions = require('firebase-functions')

const admin = require('firebase-admin')
admin.initializeApp();

const db = admin.firestore()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!")
// })

exports.addStudentPayments = functions.firestore
  .document('students/{studentId}')
  .onWrite((change, context) => {

    const studentId = context.params.studentId

    // if student was deleted skip any payment action
    if (!change.after.exists) {
      return db.collection('payments')
        .where('student.id', '==', studentId)
        .get()
        .then(querySnapshot => {
          const batch = db.batch()

          // Update payment status to canceled
          querySnapshot.forEach(doc => {
            batch.delete(doc.ref)
          })

          return batch.commit()
        })
    }

    // Retrieve the current and previous value
    const student = change.after.data()
    const previousStudentData = change.before.exists ? change.before.data() : { modality: [] }

    // Create sets of old and new modality lists
    const newModalitySet = new Set(student.modality)
    const oldModalitySet = new Set(previousStudentData.modality)

    const allModalities = Array.from(new Set([ ...newModalitySet, ...oldModalitySet ]))
    allModalities.forEach((modality, index) => {
      // modality was removed
      const today = new Date()
      const dueDate = new Date(today.getFullYear(), today.getMonth(), 1)
      const payments = db.collection('payments')
        .where('student.id', '==', studentId)
        .where('dueDate', '>=', dueDate)
        .where('modality', '==', modality)
        .where('paid', '==', false)

      if (!newModalitySet.has(modality)) {
        return payments.get()
          .then(querySnapshot => {
            const batch = db.batch()

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

            const batch = db.batch()

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
              if (modality === 'garrinhas') {
                amount = 70
              }

              // getMonth() refers to months from 0 to 11
              for (var month = today.getMonth(); month <= 11; month++) {
                db.collection('payments').add({
                  modality,
                  amount,
                  dueDate: new Date(today.getFullYear(), month, 20),
                  paid: false,
                  canceled: false,
                  student: {
                    id: studentId,
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
    const studentId = context.params.studentId
    const student = change.after.data()
    const previousStudentData = change.before.data()

    // We'll only update if the name has changed.
    // This is crucial to prevent infinite loops.
    if (student.name === previousStudentData.name) {
      return null
    }

    // Update 'student' field in all payments
    // referencing this student
    return db.collection('payments')
      .where('student.id', '==', studentId)
      .get()
      .then(querySnapshot => {
        const batch = db.batch()

        // Update payment status to canceled
        querySnapshot.forEach(doc => {
          batch.update(doc.ref, { 'student.name': student.name })
        })

        return batch.commit()
      })
  })
