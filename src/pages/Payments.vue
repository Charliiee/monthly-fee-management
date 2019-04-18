<template>
  <q-page padding>
    <q-list bordered separator>

      <payment v-for="payment in payments" :key="payment.id"></payment>

      <q-slide-item @left="onLeft" @right="onRight" left-color="amber" right-color="primary">
        <template v-slot:left>
          <div class="row items-center text-black">
            <q-icon left name="done" /> Left
          </div>
        </template>
        <template v-slot:right>
          <div class="row items-center">
            Right content.. long <q-icon right name="alarm" />
          </div>
        </template>

        <q-item class="border-left green bg-grey-3">
          <q-item-section avatar>
            <q-icon color="purple" name="event" />
          </q-item-section>
          <q-item-section>Custom colors 2</q-item-section>
        </q-item>
      </q-slide-item>

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
