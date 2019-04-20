<template>
  <q-page padding>
    <q-list bordered separator>

      <payment
        v-for="payment in payments"
        :key="payment.id"
        :payment="payment"
        :active="selectedPayments.has(payment.id)"
        @click="updateSelectedPayments"
        >
      </payment>

    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

import Payment from '../components/Payment'

export default {
  name: 'Payments',
  components: {
    Payment
  },
  data () {
    return {
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
    onLeft () {
      console.log('left')
    }
  }
}
</script>

<style>
</style>
