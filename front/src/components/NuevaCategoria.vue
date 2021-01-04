<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
    >
      <v-text-field
        v-model="editedItem.nombre"
        label="Nombre"
        :rules="rules.required"
        @keyup="onChangeData"
      ></v-text-field>
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <v-text-field
        v-model="editedItem.descripcion"
        label="Descripción"
        :rules="rules.required"
        @keyup="onChangeData"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { rules } from '../contants'

export default {
  name: 'NuevaCategoria',
  data() {
    return {
      rules: rules,
      editedItem: {
        nombre: null,
        descripcion: null
      }
    }
  },
  methods: {
    onChangeData() {
      this.$emit('on-change-data', this.editedItem)
    }
  }
}
</script>

<style>

</style>