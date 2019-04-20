export function retrievePayments (state, payments) {
  state.payments = payments
}

export function updatePayment (state, payment) {
  const index = state.payments.findIndex(item => item.id === payment.id)
  state.payments.splice(index, 1, { ...payment })
}

export function addPayment (state, payment) {
  state.payments.push(payment)
}
