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
        rol === 'superadministrator' || rol === 'conserje' || rol === 'comite') {
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
  verifyConserje: async (req, res, next) => {
    if (!req.headers.token) {
      res.status(404).json({
        message: 'no token'
      })
    } else {
      const {rol} = await tokenService.decode(req.headers.token)
      if (
        rol === 'superadministrator' || rol === 'conserje') {
        next()
      } else {
        return res.status(403).json({
          message: 'No autorizado'
        })
      }
    }
  },
  verifyComite: async (req, res, next) => {
    if (!req.headers.token) {
      res.status(404).json({
        message: 'no token'
      })
    } else {
      const {rol} = await tokenService.decode(req.headers.token)
      if (
        rol === 'superadministrator' || rol === 'comite') {
        next()
      } else {
        return res.status(403).json({
          message: 'No autorizado'
        })
      }
    }
  }
}