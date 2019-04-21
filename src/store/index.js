import Vue from 'vue'
import Vuex from 'vuex'

import payment from './payment'
import student from './student'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      payment,
      student
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */
  /* eslint-disable global-require */
  if (process.env.DEV && module.hot) {
    module.hot.accept(['./payment', './student'], () => {
      const newPayment = require('./payment').default
      const newStudent = require('./student').default
      Store.hotUpdate({ modules: { payment: newPayment, student: newStudent } })
    })
  }
  /* eslint-disable global-require */

  return Store
}
