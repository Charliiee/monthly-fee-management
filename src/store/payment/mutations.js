export function retrievePayments (state, payments) {
  state.payments = payments
}

export function addPayment (state, payment) {
  state.payments.push(payment)
}
