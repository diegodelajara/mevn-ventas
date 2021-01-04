import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    token: null,
    usuario: null,
    dialogLogin: null,
    snackbarText: null,
    snackbar: null
  },

  getters: {
    dialogLogin(state) {
      return state.dialogLogin
    },
    usuario(state) {
      return state.usuario
    },
    snackbar(state) {
      return state.snackbar
    },
    snackbarText(state) {
      return state.snackbarText
    }
  },

  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUsuario(state, usuario) {
      state.usuario = usuario
    },
    setDialogLogin(state, dialog) {
      state.dialogLogin = dialog
    },
    setSnackbar(state, snackbar) {
      state.snackbar = snackbar
    },
    setSnackbarText(state, text) {
      state.snackbarText = text
    }
  },

  actions: {
    guardarToken({commit}, token) {
      commit("setToken", token)
      commit("setUsuario", decode(token))
      localStorage.setItem("token", token)
    },
    autoLogin({commit}) {
      const token = localStorage.getItem('token')
      if (token) {
        commit("setToken", token)
        commit("setUsuario", decode(token))
      }
      router.push({name: 'home'})
    },
    salir({commit}) {
      commit("setToken", null)
      commit("setUsuario", null)
      localStorage.removeItem('token')
      router.push({name: 'login'})
    }
  }
})