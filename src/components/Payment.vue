<template>
  <q-slide-item
    @left="$emit('left', $event)"
    left-color="green"
    right-color="red"
    >
    <template v-slot:left>
      <div class="row items-center">
        <q-icon left name="done" /> Pago
      </div>
    </template>

    <q-item
      clickable
      v-ripple
      :active="active"
      @click="$emit('click', payment.id)"
      active-class="bg-primary text-white"
      class="border-left"
      :class="paymentStatus"
      >
      <q-item-section avatar>
        <q-icon :name="modalityIcon" />
      </q-item-section>
      <q-item-section class="text-capitalize">{{ payment.student.name }}: {{ payment.modality }} {{ formatedPaymentDueDate }}</q-item-section>
      <q-item-section side>R$ {{ payment.amount }}</q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'Payment',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    payment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    formatedPaymentDueDate () {
      return date.formatDate(new Date(this.payment.dueDate), 'MM/YYYY')
    },
    modalityIcon () {
      if (this.payment.modality === 'tai chi') {
        return 'fas fa-yin-yang'
      }
      if (this.payment.modality === 'kung fu') {
        return 'fas fa-torii-gate'
      }
      if (this.payment.modality === 'sanda') {
        return 'fas fa-fist-raised'
      }
      return 'fas fa-grin-wink'
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
