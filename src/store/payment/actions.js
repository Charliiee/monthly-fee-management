import db from '../../libs/firebase'

export function retrievePayments (context) {
  db.collection('payments').get()
    .then(querySnapshot => {
      const tempPayments = []
      querySnapshot.forEach(doc => {
        const docData = doc.data()
        tempPayments.push({
          id: doc.id,
          dueDate: docData.dueDate,
          paid: docData.paid,
          canceled: docData.canceled,
          amount: docData.amount,
          modality: docData.modality,
          student: docData.student
        })
      })

      const paymentsSorted = tempPayments.sort((a, b) => {
        return a.dueDate.seconds - b.dueDate.seconds
      })

      context.commit('retrievePayments', paymentsSorted)
    })
}

export function updatePayment (context, payment) {
  db.collection('payments').doc(payment.id)
    .set({
      paid: payment.paid,
      amount: payment.amount,
      student: payment.student
    }, { merge: true })
    .then(() => {
      context.commit('updatePayment', payment)
    })
}
