<template>
  <q-page padding>
    <q-list bordered separator>

      <payment
        v-for="payment in payments"
        :key="payment.id"
        :payment="{ ...payment }"
        :active="selectedPayments.has(payment.id)"
        @click="updateSelectedPayments"
        >
      </payment>

    </q-list>

    <div class="fixed-bottom column" v-show="selectedPayments.size">
      <q-btn-group spread flat>
        <q-btn color="green" label="Pago" icon="done" @click="updatePayments(true)" />
        <q-btn color="red" label="Não Pago" icon="close" @click="updatePayments(false)" />
      </q-btn-group>
    </div>

    <q-dialog v-model="studentForm" full-width persistent>
      <student-form></student-form>
    </q-dialog>

    <q-dialog v-model="paymentForm">
      <payment-form></payment-form>
    </q-dialog>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        icon="add"
        direction="up"
        color="primary"
        >
        <q-fab-action @click="studentForm = true" color="blue" icon="person_add">
          <q-tooltip
            anchor="center left"
            self="center right"
            transition-show="rotate"
            transition-hide="rotate">
            <span class="text-subtitle2">Adicionar Aluno</span>
          </q-tooltip>
        </q-fab-action>
        <q-fab-action @click="paymentForm = true" color="blue" icon="add">
          <q-tooltip
            anchor="center left"
            self="center right"
            transition-show="rotate"
            transition-hide="rotate">
            <span class="text-subtitle2">Adicionar Cobranças</span>
          </q-tooltip>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

import Payment from '../components/Payment'
import PaymentForm from '../components/PaymentForm'
import StudentForm from '../components/StudentForm'

export default {
  name: 'Payments',
  components: {
    Payment,
    PaymentForm,
    StudentForm
  },
  data () {
    return {
      paymentForm: false,
      studentForm: false,
      selectedPayments: new Set([])
    }
  },
  created () {
    this.$store.dispatch('payment/retrievePayments')
  },
  computed: {
    ...mapGetters('payment', ['payments'])
  },
  methods: {
    updateSelectedPayments (payment) {
      if (this.selectedPayments.has(payment)) {
        this.selectedPayments.delete(payment)
      } else {
        this.selectedPayments.add(payment)
      }
      this.selectedPayments = new Set(Array.from(this.selectedPayments))
    },
    updatePayments (paid) {
      // filter payments selected and update their paid status
      this.payments.filter(payment => this.selectedPayments.has(payment.id))
        .forEach(payment => {
          this.$store.dispatch('payment/updatePayment', { ...payment, paid })
          this.selectedPayments.delete(payment.id)
        })
    }
  }
}
</script>

<style>
</style>
