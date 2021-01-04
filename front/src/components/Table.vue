<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="nombre"
    class="elevation-0"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          color="primary"
          class="mb-2"
          @click="nuevo"
        >
          Nuevo
        </v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline"
                >{{ editing ? "Editar" : "Agregar" }} {{ formTitle }}</span
              >
            </v-card-title>

            <v-card-text>
              <v-container>
                <component
                  :is="cmpnt"
                  ref="nuevo"
                  :editing="editing"
                  :editedItem="editedItem"
                  @on-valid="onValid"
                  @on-close="close"
                >
                </component>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> cerrar </v-btn>
              <v-btn depressed color="primary" :disabled="!valid" @click="save">
                guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogConfirm" max-width="500px">
          <v-card>
            <v-card-title class="headline">
              ¿Estás seguro que quieres
              {{ action ? "activar" : "desactivar" }} este item?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.nombre="{ item }">
      <td class="text-start">{{ item.nombre }}</td>
    </template>
    <template v-slot:item.descripcion="{ item }">
      <td class="text-start">{{ item.descripcion }}</td>
    </template>
    <template v-slot:item.createdAt="{ item }">
      <td class="text-start">{{ item.createdAt }}</td>
    </template>
    <template v-slot:item.estado="{ item }">
      <td v-if="item.estado === 1">
        <v-icon color="success">mdi-account-check</v-icon>
      </td>
      <td v-else>
        <v-icon color="error">mdi-account-cancel</v-icon>
      </td>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon v-if="item.estado === 1" small @click="desactivar(item)">block</v-icon>
      <v-icon v-else small @click="activar(item)">check</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { rules } from "../contants";

import NuevaCategoria from "./NuevaCategoria";
import NuevoUsuario from "./NuevoUsuario";

export default {
  name: "Table",
  components: {
    NuevaCategoria,
    NuevoUsuario,
  },
  props: {
    cmpnt: {
      required: true,
      type: String,
    },
    headers: {
      required: true,
    },
    items: {
      required: true,
    },
    formTitle: {
      type: String,
      default: "",
    },
    tableTitle: {
      type: String,
      default: "",
    },
    dialogDelete: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      dialog: null,
      editedItem: {
        nombre: null,
        email: null,
        password: null,
        rol: null,
        numeroDocumento: null,
        tipoDocumento: null,
        direccion: null,
        telefono: null,
        estado: 1
      },
      defaultItem: {},
      rules: rules,
      editing: false,
      action: null,
      valid: null,
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  computed: {
    dialogConfirm: {
      get() {
        return this.dialogDelete
      },
      set(value) {
        this.$emit('on-close-confirm-dialog', value)
      }
    }
  },
  methods: {
    onValid(valid) {
      this.valid = valid
    },

    nuevo() {
      this.editing = false
      this.dialog = true
    },
    initialize() {
      this.$emit("on-reset");
    },
    editItem(item) {
      this.dialog = true;
      this.editing = true;
      this.editedItem = item
    },

    desactivar(item) {
      this.action = 0
      this.editedItem = Object.assign({}, item)
      this.$emit('on-desactivate', this.editedItem._id )
    },

    activar(item) {
      this.action = 1
      this.editedItem = Object.assign({}, item)
      this.$emit('on-activate', this.editedItem._id )
    },

    async deleteItemConfirm() {
      this.$emit("on-activate-confirmation", {
        _id: this.editedItem._id,
        action: this.action
      })
      // let url
      // url = this.action === 1 ? 'categoria/activate': 'categoria/desactivate'
      // try {
      //     await axios.put(url, {_id: this.editedItem._id})
      //     this.$emit('on-get-categorias')
      //   } catch (error) {
      //     console.log('%c error', 'color:tomato', error)
      //   }
      // this.dialogDelete = false
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.$emit('on-close-confirm-dialog')
    },
    async save() {
      this.$refs["nuevo"].save(this.editedItem._id);
      this.close();
      this.$store.commit("setSnackbarText", "Item agregado exitosamente");
      this.$store.commit("setSnackbar", true);
      this.$emit("on-get-rows");
    },
  },
};
</script>

<style>
</style>