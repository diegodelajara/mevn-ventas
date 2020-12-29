<template>
  <v-layout align-start>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="items"
          sort-by="nombre"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>My CRUD</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    depressed
                    color="primary"
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Nuevo
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                        >
                          <v-text-field
                            v-model="editedItem.nombre"
                            label="Nombre"
                            :rules="rules.required"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                        >
                          <v-text-field
                            v-model="editedItem.descripcion"
                            label="Descripción"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      cerrar
                    </v-btn>
                    <v-btn
                      depressed
                      color="primary"
                      @click="save"
                    >
                      guardar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">
                    ¿Estás seguro que quieres {{action ? 'activar': 'desactivar'}} este item?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.nombre="{ item }">
            <td class="text-start">{{item.nombre}}</td>
          </template>
          <template v-slot:item.descripcion="{ item }">
            <td class="text-start">{{item.descripcion}}</td>
          </template>
          <template v-slot:item.createdAt="{ item }">
            <td class="text-start">{{item.createdAt}}</td>
          </template>
          <template v-slot:item.estado="{ item }">
            <td v-if="item.estado === 1">
              Activo
            </td>
            <td v-else class="red-text">
              Inactivo
            </td>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              v-if="item.estado === 1"
              small
              @click="desactivar(item)"
              color="error"
            >
              block
            </v-icon>
            <v-icon
              v-else
              small
              @click="activar(item)"
              color="success"
            >
              check
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn
              color="primary"
              @click="initialize"
            >
              Reset
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import axios from 'axios'
import { rules } from '../contants'

export default {
  name: 'Table',
  props: {
    headers: {
      required: true
    },
    items: {
      required: true
    },
    formTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialog: null,
      dialogDelete: false,
      editedItem: {
        _id: null,
        nombre: '',
        descripcion: ''
      },
      defaultItem: {
        nombre: '',
        descripcion: ''
      },
      rules: rules,
      editing: false,
      action: null
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  methods: {
    initialize() {
      this.$emit('on-reset')
    },
    editItem (item) {
        this.editedItem._id = item._id
        this.editedItem.nombre= item.nombre
        this.editedItem.descripcion = item.descripcion
        this.dialog = true
        this.editing = true
      },

      desactivar (item) {
        this.action = 0
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      activar (item) {
        this.action = 1
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        let url
        url = this.action === 1 ? 'categoria/activate': 'categoria/desactivate'
        try {
            await axios.put(url, {_id: this.editedItem._id})
            this.$emit('on-get-categorias')
          } catch (error) {
            console.log('%c error', 'color:tomato', error)
          }
        this.dialogDelete = false
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      async save () {
        if (this.editing) {
          try {
            await axios.put('categoria/update', this.editedItem)
            this.$emit('on-get-categorias')
          } catch (error) {
            console.log('%c error', 'color:tomato', error)
          }
        } else {
          try {
            await axios.post('categoria/add', this.editedItem)
            this.$emit('on-get-categorias')
          } catch (error) {
            console.log('%c error', 'color:tomato', error)
          }
        }
        this.close()
      }
  }
}
</script>

<style>

</style>