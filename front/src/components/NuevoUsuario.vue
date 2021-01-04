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
          v-model="editedItem.email"
          label="Email"
          :rules="rules.loginEmailRules"
          @keyup="changeData"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-select
          :items="documentTypes"
          item-text="name"
          item-value="value"
          v-model="editedItem.tipoDocumento"
          label="Tipo de documento"
          :rules="rules.required"
          @change="changeData"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="editedItem.numeroDocumento"
          label="Nº de documento"
          :rules="editedItem.tipoDocument === 'rut' ? rules.rut:rules.required"
          @keyup="changeData"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="editedItem.direccion"
          label="Dirección"
          :rules="rules.required"
          @keyup="changeData"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="editedItem.telefono"
          label="Teléfono"
          :rules="rules.required"
          @keyup="changeData"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="editedItem.password"
          label="Contraseña"
          type="password"
          :rules="rules.required"
          @keyup="changeData"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="repeatPassword"
          label="Repita la contraseña"
          type="password"
          :rules="rules.required"
          @keyup="changeData"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
      >
        <v-select
          :items="roles"
          item-text="name"
          item-value="value"
          v-model="editedItem.rol"
          label="Rol"
          :rules="rules.rolRequired"
          @change="changeData"
        ></v-select>
      </v-col>
      <v-col cols="12">
        {{ errorMessage }}
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import axios from 'axios'
import { rules } from '../contants'

export default {
  name: 'NuevoUsuario',
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
      valid: null,
      errorMessage: null,
      rules: rules,
      // editedItem: {
      //   nombre: null,
      //   email: null,
      //   password: null,
      //   rol: null,
      //   numeroDocumento: null,
      //   tipoDocumento: null,
      //   direccion: null,
      //   telefono: null,
      //   estado: 1
      // },
      repeatPass: null,
      roles: [
        { id: 1, name: 'Super administrador', value: 'superadministrator' },
        { id: 2, name: 'Almacenero', value: 'almacenero' },
        { id: 3, name: 'Vendedor', value: 'vendedor' },
      ],
      documentTypes: [
        { id: 1, name: 'RUT', value: 'rut' },
        { id: 2, name: 'Pasaporte', value: 'pasaporte' }
      ]
    }
  },
  watch: {
    valid(newVal) {
      this.$emit('on-valid', newVal)
    },
    'editedItem.numeroDocumento': function () {
      if (this.editedItem.tipoDocumento === 'rut') {
        this.editedItem.numeroDocumento = this.cleanRut(this.editedItem.numeroDocumento)
        let len = this.editedItem.numeroDocumento.length - 1
        if (len > 3) {
          let dv = this.editedItem.numeroDocumento[len]
          let beforeDv = this.editedItem.numeroDocumento
            .substring(0, len)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          this.editedItem.numeroDocumento = beforeDv + "-" + dv
        }
      }
    }
  },
  methods: {
    cleanRut(value) {
      return value.replace(/^0+|[^0-9kK]+/g, "").toUpperCase()
    },
    changeData() {
      this.$emit('on-valid', this.valid)
    },
    async save () {
      if (this.editing && this.valid) {
        try {
          await axios.put('usuario/update', this.editedItem)
          this.$emit('on-get-rows')
        } catch (error) {
          console.log('%c error', 'color:tomato', error)
        }
      } else {
        try {
          if (this.editedItem.password === this.repeatPass) {
            await axios.post('usuario/add', this.editedItem)
            this.$emit('on-get-rows')
          } else {
            this.errorMessage = 'Las contraseñas no coinciden'
          }
        } catch (error) {
          console.log('%c error', 'color:tomato', error)
        }
      }
      this.$emit('on-close')
    }
  },
  computed: {
    repeatPassword: {
      get() {
        return this.editing ? this.editedItem.password : this.repeatPass
      }
    }
  }
}
</script>

<style>

</style>