<template>
  <div>
    <Table
      tableTitle="Usuarios"
      formTitle="usuario"
      cmpnt="NuevoUsuario"
      :dialogDelete="dialogDelete"
      :headers="headers"
      :items="items"
      @on-get-rows="onGetRows"
      @on-reset="onGetRows"
      @on-activate="onActivate"
      @on-desactivate="onDesactivate"
      @on-activate-confirmation="onActivateConfirmation"
      @on-close-confirm-dialog="dialogDelete = false"
    />
    <v-snackbar v-model="mySnackbar">{{ snackbarText }}</v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import Table from './Table'
export default {
  components: {
    Table
  },
  data() {
    return {
      dialogDelete: false,
      headers: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Email', value: 'email' },
        { text: 'Rol', value: 'rol'},
        { text: 'Estado', value: 'estado' },
        { text: 'Fecha de cración', value: 'createdAt' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      items: []
    }
  },
  mounted() {
    this.getUsuarios()
  },
  computed: {
    ...mapGetters([
      'snackbar',
      'snackbarText'
    ]),
    mySnackbar: {
      get() {
        return this.snackbar
      },
      set(value) {
        this.$store.commit('setSnackbar', value)
      }
    }
  },
  methods: {
    async onGetRows() {
      await this.getUsuarios()
    },
    async getUsuarios() {
      try {
        const { data }= await axios.get('usuario/list')
        this.items = data
      } catch (error) {
        console.log('%c error', 'color:tomato', error)
      }
    },
    async onActivate() {
      this.dialogDelete = true
    },
    async onDesactivate() {
      this.dialogDelete = true
    },
    async onActivateConfirmation(item) {
      let url
      url = item.action === 1 ? 'usuario/activate': 'usuario/desactivate'
      try {
        await axios.put(url, {_id: item._id})
        this.getUsuarios()
      } catch (error) {
        console.log('%c error', 'color:tomato', error)
      }
      this.dialogDelete = false
    }
  }
}
</script>

<style>

</style>