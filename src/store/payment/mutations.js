export function setPayments (state, payments) {
  state.payments = payments
}

export function addPayment (state, payment) {
  state.payments.push(payment)
}
