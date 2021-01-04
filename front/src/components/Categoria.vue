<template>
  <div>
    <Table
      tableTitle="Categorías"
      formTitle="categoría"
      cmpnt="NuevaCategoria"
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
        {
          text: 'Nombre',
          sortable: true,
          value: 'nombre',
        },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Fecha', value: 'createdAt' },
        { text: 'Estado', value: 'estado' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      items: []
    }
  },
  mounted() {
    this.getCategorias()
  },
  methods: {
    onGetRows() {
      this.getCategorias()
    },
    async getCategorias() {
      try {
        const { data }= await axios.get('categoria/list')
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
      url = item.action === 1 ? 'categoria/activate': 'categoria/desactivate'
      try {
        await axios.put(url, {_id: item._id})
        this.getCategorias()
        this.$store.commit('setSnackbarText', `Item ${item.action ? 'activado' : 'desactivado'} correctamente`)
        this.mySnackbar = true
      } catch (error) {
        console.log('%c error', 'color:tomato', error)
      }
      this.dialogDelete = false
    }
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
}
</script>

<style>

</style>