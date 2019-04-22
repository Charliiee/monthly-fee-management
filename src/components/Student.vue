<template>
  <div>
    <q-item
      clickable
      v-ripple
      @click="$emit('click', student)"
      :class="student.modality.length ? '' : 'bg-grey-4'"
      >
      <q-item-section avatar>
        <q-icon name="person" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ student.name }}</q-item-label>
        <q-item-label caption>{{ formattedDocument }}</q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-chip
          v-for="(modality, index) in student.modality"
          :key="index"
          :icon="modalityIcon(modality)"
          square
          dense
          outline
          size="10px"
          >
          {{ modality }}
        </q-chip>
      </q-item-section>
    </q-item>

    <q-separator dense />
  </div>
</template>

<script>
export default {
  name: 'Student',
  props: {
    student: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    formattedDocument () {
      if (this.student.document.length <= 9) {
        return this.student.document.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4')
      }
      return this.student.document.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4')
    }
  },
  methods: {
    updatePayment (details) {
      if (this.payment.paid) {
        return
      }
      this.payment.paid = true
      this.$store.dispatch('payment/updatePayment', { ...this.payment })
      details.reset()
    },
    modalityIcon (modality) {
      if (modality === 'tai chi') {
        return 'fas fa-yin-yang text-black'
      }
      if (modality === 'kung fu') {
        return 'fas fa-torii-gate text-red'
      }
      if (modality === 'sanda') {
        return 'fas fa-fist-raised text-black'
      }
      return 'fas fa-grin-wink'
    }
  }
}
</script>

<style>
</style>
