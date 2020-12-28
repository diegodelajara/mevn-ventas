import models from '../models'

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.articulo.create(req.body)
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      })
      next(e)
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.articulo.findOne({_id: req.query._id})
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
      const reg = await models.articulo.find(
        {
          $or:[
            { nombre: new RegExp(valor, 'i') },
            { descripcion: new RegExp(valor, 'i') }
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
  update: async (req, res, next) => {
    try {
      const reg = await models.articulo.findByIdAndUpdate(
        {
          _id: req.body._id
        },
        {
          categoria: req.body.categoria,
          codigo: req.body.codigo,
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          precioVenta: req.body.precioVenta,
          stock: req.body.stock,
          descripcion: req.body.descripcion,
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
      const reg = await models.articulo.findByIdAndDelete({_id: req.body._id})
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
      const reg = await models.articulo.findByIdAndUpdate({_id: req.body._id}, {estado: 1})
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
      const reg = await models.articulo.findByIdAndUpdate({_id: req.body._id}, {estado: 0})
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      })
      next(e)
    }
  }
}