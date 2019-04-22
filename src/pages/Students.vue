<template>
  <q-page>
    <q-list bordered separator>

      <student
        v-for="student in students"
        :key="student.id"
        :student="{ ...student }"
        @click="updateStudents"
        >
      </student>

    </q-list>

    <float-button :show-student-form="studentForm" :student="student" @close-popup="closePopUp" />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

import Student from '../components/Student'
import FloatButton from '../components/FloatButton'

export default {
  name: 'Students',
  components: {
    Student,
    FloatButton
  },
  data () {
    return {
      studentForm: false,
      student: null,
      selectedStudents: new Set([])
    }
  },
  created () {
    this.$store.dispatch('student/retrieveStudents')
  },
  computed: {
    ...mapGetters('student', ['students'])
  },
  methods: {
    updateStudents (student) {
      this.studentForm = true
      this.student = student
    },
    closePopUp () {
      this.studentForm = false
      this.student = null
    }
  }
}
</script>

<style>
</style>
