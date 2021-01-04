import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import Categoria from './components/Categoria'
import Usuario from './components/Usuario'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        superadministrator: true,
        almacenero: true,
        vendedor: true
      }
    },
    {
      path: '/categoria',
      name: 'categoria',
      component: Categoria,
      meta: {
        superadministrator: true,
        almacenero: true
      }
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: Usuario,
      meta: {
        superadministrator: true,
        almacenero: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (store.state.usuario && store.state.usuario.rol === 'superadministrator') { 
    if (to.matched.some(record => record.meta.superadministrator)) {
      next()
    }
  } else if (store.state.usuario && store.state.usuario.rol === 'vendedor') { 
    if (to.matched.some(record => record.meta.vendedor)) {
      next()
    }
  } else if (store.state.usuario && store.state.usuario.rol === 'almacenero') { 
    if (to.matched.some(record => record.meta.almacenero)) {
      next()
    }
  } else {
    if (!localStorage.getItem('token')) {
      store.commit('setDialogLogin', true)
    }
  }
})
export default router