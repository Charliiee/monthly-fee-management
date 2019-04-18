<template>
  <q-slide-item @left="$emit('left')" @right="$emit('right')" left-color="green" right-color="red">
    <template v-slot:left>
      <div class="row items-center">
        <q-icon left name="done" /> Pago
      </div>
    </template>
    <template v-slot:right>
      <div class="row items-center">
        Não Pago <q-icon right name="close" />
      </div>
    </template>

    <q-item class="border-left" :class="paymentStatus">
      <q-item-section avatar>
        <q-icon color="primary" name="cell_wifi" />
      </q-item-section>
      <q-item-section>{{ payment.modality }} {{ formatedPaymentDueDate }} - R$ {{ payment.amount }}</q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'Payment',
  props: ['payment'],
  data () {
    return {}
  },
  computed: {
    formatedPaymentDueDate () {
      return date.formatDate(new Date(this.payment.dueDate), 'MM/YYYY')
    },
    paymentStatus () {
      if (this.payment.paid) {
        return 'green'
      }

      // check if it's overdue
      const dueDate = new Date(this.payment.dueDate)
      const today = new Date()
      if (dueDate < today) {
        // check if overdue payment is within this month yet
        if (dueDate.getFullYear() === today.getFullYear() &&
          dueDate.getMonth() === today.getMonth()) {
          return 'amber'
        }
        return 'red'
      }

      return 'gray'
    }
  }
}
</script>

<style scoped>
.border-left {
  border-left: 4px solid;
}
.border-left.red {
  border-color: #f44336;
}
.border-left.amber {
  border-color: #ffc107;
}
.border-left.green {
  border-color: #4caf50;
}
.border-left.gray {
  border-color: #cecece;
}
</style>
