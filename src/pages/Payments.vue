<template>
  <q-page>
    <q-toolbar class="bg-primary text-white" inset>
      <div class="col-grow">
        <q-input dark dense standout type="search" v-model="filterText" input-class="text-right" placeholder="Pesquisar">
          <template v-slot:append>
            <q-icon v-if="filterText === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="filterText = ''" />
          </template>
        </q-input>
      </div>
    </q-toolbar>

    <q-list bordered separator>

      <payment
        v-for="payment in filteredPayments"
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

    <float-button />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

import Payment from '../components/Payment'
import FloatButton from '../components/FloatButton'

export default {
  name: 'Payments',
  components: {
    Payment,
    FloatButton
  },
  data () {
    return {
      filterText: '',
      selectedPayments: new Set([])
    }
  },
  created () {
    this.$store.dispatch('payment/retrievePayments')
  },
  computed: {
    filteredPayments () {
      const text = this.filterText.toLowerCase()
      return this.payments.filter(payment =>
        payment.student.name.toLowerCase().indexOf(text) >= 0 ||
        payment.modality.toLowerCase().indexOf(text) >= 0
      )
    },
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
