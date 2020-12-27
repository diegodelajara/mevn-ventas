import tokenService from '../services/token'

export default {
  verifyUser: async (req, res, next) => {
    if (!req.headers.token) {
      res.status(404).json({
        message: 'no token'
      })
    } else {
      const {rol} = await tokenService.decode(req.headers.token)
      if (
        rol === 'superadministrator' || rol === 'vendedor' || rol === 'almacenero') {
        next()
      } else {
        return res.status(403).json({
          message: 'No autorizado'
        })
      }
    }
    
  },
  verifySuperadministrator: async (req, res, next) => {
    if (!req.headers.token) {
      res.status(404).json({
        message: 'no token'
      })
    } else {
      const {rol} = await tokenService.decode(req.headers.token)
      if (
        rol === 'superadministrator') {
        next()
      } else {
        return res.status(403).json({
          message: 'No autorizado'
        })
      }
    }
  },
  verifyVendedor: async (req, res, next) => {
    if (!req.headers.token) {
      res.status(404).json({
        message: 'no token'
      })
    } else {
      const {rol} = await tokenService.decode(req.headers.token)
      if (
        rol === 'superadministrator' || rol === 'vendedor') {
        next()
      } else {
        return res.status(403).json({
          message: 'No autorizado'
        })
      }
    }
  },
  verifyAlmacenero: async (req, res, next) => {
    if (!req.headers.token) {
      res.status(404).json({
        message: 'no token'
      })
    } else {
      const {rol} = await tokenService.decode(req.headers.token)
      if (
        rol === 'superadministrator' || rol === 'almacenero') {
        next()
      } else {
        return res.status(403).json({
          message: 'No autorizado'
        })
      }
    }
  }
}