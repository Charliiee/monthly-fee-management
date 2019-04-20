<template>
  <q-page padding>
    <q-list bordered separator>

      <payment v-for="payment in payments" :key="payment.id" :payment="payment"></payment>

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

    }
  },
  created () {
    this.$store.dispatch('payment/retrievePayments')
  },
  computed: {
    ...mapGetters('payment', ['payments'])
  },
  methods: {
    onRight () {
      console.log('right')
    },
    onLeft () {
      console.log('left')
    }
  }
}
</script>

<style>
</style>
