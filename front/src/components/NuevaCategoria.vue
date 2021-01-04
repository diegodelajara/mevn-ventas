<template>
  <v-form v-model="valid">
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="editedItem.nombre"
          label="Nombre"
          :rules="rules.required"
          @keyup="changeData"
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
          @keyup="changeData"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import axios from 'axios'
import { rules } from '../contants'

export default {
  name: 'NuevaCategoria',
  props: {
    editing: {
      type: Boolean,
      required: true
    },
    editedItem: {
      required: false,
      type: Object
    }
  },
  data() {
    return {
      rules: rules,
      valid: null
    }
  },
  methods: {
    changeData() {
      this.$emit('on-valid', this.valid)
    },
    async save () {
      if (this.editing && this.valid) {
        try {
          await axios.put('categoria/update', this.editedItem)
          this.$emit('on-get-rows')
        } catch (error) {
          console.log('%c error', 'color:tomato', error)
        }
      } else {
        try {
          await axios.post('categoria/add', this.editedItem)
          this.$emit('on-get-rows')
        } catch (error) {
          console.log('%c error', 'color:tomato', error)
        }
      }
      this.$emit('on-close')
    }
  }
}
</script>

<style>

</style>