<template>
  <div>
    <Table
      tableTitle="Categorías"
      formTitle="categoría"
      cmpnt="NuevaCategoria"
      :headers="headers"
      :items="items"
      @on-get-rows="onGetRows"
      @on-reset="onGetRows"
    />
    <v-snackbar v-model="snackbar">{{ text }}</v-snackbar>
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
    }
  },
  computed: {
    ...mapGetters([
      'snackbar'
    ]),
    mySnackbar: {
      get() {
        return this.snackbar
      },
      set(value) {
        this.$store.commit('setSnackbar', value)
      }
    }
  }
}
</script>

<style>

</style>