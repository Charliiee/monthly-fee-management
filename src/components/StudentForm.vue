<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Novo Aluno</div>
    </q-card-section>

    <q-card-section>
      <q-form
        class="q-gutter-md"
        >
        <q-input
          filled
          v-model="name"
          label="Nome do Aluno *"
          hint="Nome e sobrenome"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor, digite alguma coisa']"
          />

        <q-input
          filled
          v-model="document"
          label="Documento do Aluno"
          hint="CPF ou RG"
          :mask="documentMask"
          unmasked-value
          lazy-rules
          :rules="[
          val => val && val.length > 0 || 'Por favor, digite um documento',
          val => val.length > 8 && val.length <= 11 || 'Por favor, digite um documento real'
          ]"
          />

          <q-select
            filled
            v-model="modalities"
            label="Modalidade"
            use-input
            emit-value
            use-chips
            multiple
            input-debounce="0"
            options-sanitize
            @new-value="addOption"
            :options="modalityOptions"
            class="text-capitalize"
            >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section>
                  <q-item-label v-html="scope.opt.label" />
                    <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                </q-item-section>
                </q-item>
            </template>
          </q-select>

      </q-form>
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Cancelar" v-close-popup />
      <q-btn @click="saveStudent" flat :label="addStudentLabel" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'StudentForm',
  props: ['student'],
  data () {
    return {
      name: '',
      document: '',
      modalities: [],
      modalityOptions: [
        {
          value: 'kung fu',
          label: 'Kung Fu'
        },
        {
          value: 'tai chi',
          label: 'Tai Chi'
        },
        {
          value: 'sanda',
          label: 'Sandá'
        },
        {
          value: 'garrinhas',
          label: 'Garrinhas'
        }
      ]
    }
  },
  created () {
    this.name = this.student.name
    this.document = this.student.document
    this.modalities = this.student.modality || []
  },
  computed: {
    documentMask () {
      return this.document.length <= 9 ? 'NN.NNN.NNN-NN' : 'NNN.NNN.NNN-NN'
    },
    addStudentLabel () {
      return this.student.id ? 'Salvar Aluno' : 'Adicionar Aluno'
    }
  },
  methods: {
    addOption (val, done) {
      if (val.length > 0) {
        const value = val.toLowerCase()
        const exists = this.modalityOptions.some(option => option.value === value)
        if (exists) {
          done()
        } else {
          done(val, 'add-unique')
        }
      }
    },
    saveStudent () {
      if (this.student.id) {
        this.$store.dispatch('student/updateStudent', {
          ...this.student,
          name: this.name,
          document: this.document,
          modality: this.modalities
        })
      } else {
        this.$store.dispatch('student/addStudent', {
          name: this.name,
          document: this.document,
          modality: this.modalities
        })
      }

      this.$q.notify({
        message: 'Aluno salvo com sucesso!',
        color: 'green'
      })

      if (this.modalities.length !== this.student.modality.length) {
        this.$q.notify({
          message: `Gerando parcelas para ${this.name}...`,
          color: 'blue'
        })
      }
    }
  },
  watch: {
    student (student) {
      this.name = this.student.name
      this.document = this.student.document
      this.modalities = this.student.modality || []
    }
  }
}
</script>

<style>
</style>
/style>
