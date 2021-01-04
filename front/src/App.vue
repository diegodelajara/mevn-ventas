<template>
  <v-app id="app">
    <v-navigation-drawer
      v-if="usuario"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-if="isSuperadministrator || isVendedor || isAlmacenero">
          <v-list-item :to="{ name: 'home' }">
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-title> Inicio </v-list-item-title>
          </v-list-item>
        </template>
        <template v-if="isSuperadministrator || isAlmacenero">
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title> Almacén </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'categoria' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Categorías </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: '' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Artículos </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
        <template v-if="isSuperadministrator || isAlmacenero">
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title> Compras </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: '' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Ingresos </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: '' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Proveedores </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
        <template v-if="isSuperadministrator || isVendedor">
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title> Ventas </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: '' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Ventas </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: '' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Clientes </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title> Accesos </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'usuario' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Usuarios </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title> Consultas </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: '' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Consulta Compras </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: '' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Consulta Ventas </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Sistema</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-avatar size="40" v-if="usuario">
                <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
              </v-avatar>
              <v-icon v-else>mdi-account-circle</v-icon>
            </v-btn>
        </template>
        <div>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="loginForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      :rules="rules.loginEmailRules"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      :rules="rules.required"
                      type="password"
                      name="input-10-1"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                  <span color="error">{{ message }}</span>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex" cols="12" sm="3" xsm="12" align-center>
                    <v-btn
                      dense
                      color="primary"
                      @click="send"
                    >
                      Entrar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </div>
      </v-dialog>
      <v-btn icon>
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>
      <v-main>
        <v-layout align-start fluid fill-height>
          <v-row>
            <v-col cols="12">
              <v-slide-y-transition mode="out-in">
                <router-view />
              </v-slide-y-transition>
            </v-col>
          </v-row>
        </v-layout>
      </v-main>
      <v-footer height="auto">
        <v-layout justify-center>
          <v-flex text-xs-center>
            <v-card flat tile color="primary" class="white--text">
              <v-card-text class="white--text pt-0">
                IncanatoIT &copy;2019
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

import { rules } from './contants'
export default {
  name: "App",
  data() {
    return {
      drawer: true,
      valid: true,
      email: 'diego@gmail.com',
      password: '123456',
      rules: rules,
      message: null
    }
  },
  methods: {
    async send() {
      try {
        const response = await axios.post('usuario/login',
          {
            email: this.email,
            password: this.password
          }
        )
        this.$store.dispatch("guardarToken", response.data.tokenReturn)
        this.$store.commit('setDialogLogin', false)
        this.$router.push({name: 'home'})
      } catch (error) {
        this.message = 'Error al ingresar'
      }
    }
  },
  computed: {
    ...mapGetters([
      'dialogLogin',
      'usuario'
    ]),
    dialog: {
      get() {
        return this.dialogLogin
      },
      set(value) {
        this.$store.commit('setDialogLogin', value)
      }
    },
    isSuperadministrator() {
      return this.usuario && this.$store.state.usuario.rol === 'superadministrator'
    },
    isAlmacenero() {
      return this.usuario && this.$store.state.usuario.rol === 'almacenero'
    },
    isVendedor() {
      return this.usuario && this.$store.state.usuario.rol === 'vendedor'
    }
  },
  created() {
    this.$store.dispatch('autoLogin')
  }
}
</script>

