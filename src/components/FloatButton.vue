<template>
  <div>
    <q-dialog v-model="studentForm" full-width persistent @hide="$emit('close-popup')">
      <student-form :student="studentData"></student-form>
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
  </div>
</template>

<script>
import PaymentForm from '../components/PaymentForm'
import StudentForm from '../components/StudentForm'

export default {
  name: 'FloatButton',
  components: {
    PaymentForm,
    StudentForm
  },
  props: {
    showPaymentForm: {
      type: Boolean,
      default: false
    },
    showStudentForm: {
      type: Boolean,
      default: false
    },
    payment: {
      type: Object
    },
    student: {
      type: Object
    }
  },
  data () {
    return {
      paymentForm: false,
      studentForm: false
    }
  },
  computed: {
    studentData () {
      return this.student || {
        name: '',
        document: '',
        modality: []
      }
    }
  },
  watch: {
    showPaymentForm (show) {
      this.paymentForm = show
    },
    showStudentForm (show) {
      this.studentForm = show
    }
  }
}
</script>

<style>
</style>
