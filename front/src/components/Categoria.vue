<template>
    <Table
      formTitle="Agregar categoría"
      :headers="headers"
      :items="items"
      @on-get-categorias="onGetCategorias"
    />
</template>

<script>
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
    onGetCategorias() {
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
}
</script>

<style>

</style>