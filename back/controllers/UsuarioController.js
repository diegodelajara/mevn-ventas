import models from '../models'
import bcrypt from 'bcryptjs'
import token  from '../services/token'

export default {
  add: async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10)
      const reg = await models.usuario.create(req.body)
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: e
      })
      next(e)
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.usuario.findOne({_id: req.query._id})
      .populate('categoria', {nombre: 1})
      if (!reg) {
        res.status(404).send({
          message: 'registro no existe'
        })
      } else {
        res.status(200).json(reg)
      }
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      })
      next(e)
    }
  },
  list: async (req, res, next) => {
    try {
      let valor = req.query.valor
      const reg = await models.usuario.find(
        {
          $or:[
            { nombre: new RegExp(valor, 'i') },
            { email: new RegExp(valor, 'i') }
          ]
        },
        // parametros que excluye al listar
        {
          // nombre: 1
          // _id: 0,
          // estado: 0,
          // createdAt: 0,
          // descripcion: 0
        }
      )
      .populate('categoria', {nombre: 1})
      .sort({nombre: -1})
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      })
      next(e)
    }
  },
  update: async (req, res, next) => {
    try {
      
      const user = await models.usuario.findOne({_id: req.body._id})
      // Si el password que viene desde front es distinto al password guardado en el usuario, 
      // entonces lo encripto
      if (user.password !== req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
      }
      const reg = await models.usuario.findByIdAndUpdate(
        {
          _id: req.body._id
        },
        {
          rol: req.body.rol,
          nombre: req.body.nombre,
          numeroDocumento: req.body.numeroDocumento,
          tipoDocumento: req.body.tipoDocumento,
          direccion: req.body.direccion,
          telefono: req.body.telefono,
          email: req.body.email,
          password: req.body.password,
          estado: req.body.estado
        }
      )
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error: ' + e
      })
      next(e)
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.usuario.findByIdAndDelete({_id: req.body._id})
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      })
      next(e)
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.usuario.findByIdAndUpdate({_id: req.body._id}, {estado: 1})
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      })
      next(e)
    }
  },
  desactivate: async (req, res, next) => {
    try {
      const reg = await models.usuario.findByIdAndUpdate({_id: req.body._id}, {estado: 0})
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      })
      next(e)
    }
  },
  login: async (req, res, next) => {
    try {
      const user = await models.usuario.findOne({email: req.body.email, estado: 1})
      if (user) {
        const equalPass = await bcrypt.compare(req.body.password, user.password)
        if (equalPass) {
          let tokenReturn = await token.encode(user._id, user.rol, user.email)
          res.status(200).send({
            user,
            tokenReturn
          })
        } else {
          res.status(404).send({
            message: 'Password incorrecto'
          })
        }
      } else {
        res.status(404).send({
          message: 'Usuario no existe'
        })  
      }
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      })
      next(e)
    }
  }
}
