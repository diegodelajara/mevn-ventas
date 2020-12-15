import models from '../models'

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.persona.create(req.body)
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
      const reg = await models.persona.findOne({_id: req.query._id})
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
      const reg = await models.persona.find(
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
      .sort({createdAt: -1})
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      })
      next(e)
    }
  },
  listClientes: async (req, res, next) => {
    try {
      let valor = req.query.valor
      const reg = await models.persona.find(
        {
          $or:[
            { nombre: new RegExp(valor, 'i') },
            { email: new RegExp(valor, 'i') }
          ],
          'tipoPersona': 'cliente'
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
      .sort({createdAt: -1})
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      })
      next(e)
    }
  },
  listProveedores: async (req, res, next) => {
    try {
      let valor = req.query.valor
      const reg = await models.persona.find(
        {
          $or:[
            { nombre: new RegExp(valor, 'i') },
            { email: new RegExp(valor, 'i') }
          ],
          'tipoPersona': 'Proveedor'
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
      .sort({createdAt: -1})
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
      const reg = await models.persona.findByIdAndUpdate(
        {
          _id: req.body._id
        },
        {
          tipoPersona: req.body.tipoPersona,
          nombre: req.body.nombre,
          numeroDocumento: req.body.numeroDocumento,
          tipoDocumento: req.body.tipoDocumento,
          direccion: req.body.direccion,
          telefono: req.body.telefono,
          email: req.body.email,
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
      const reg = await models.persona.findByIdAndDelete({_id: req.body._id})
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
      const reg = await models.persona.findByIdAndUpdate({_id: req.body._id}, {estado: 1})
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
      const reg = await models.persona.findByIdAndUpdate({_id: req.body._id}, {estado: 0})
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      })
      next(e)
    }
  }
}
