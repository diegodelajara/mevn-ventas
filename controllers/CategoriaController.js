import models from '../models'
export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.categoria.create(req.body)
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
      const reg = await models.categoria.findOne({_id: req.query._id})
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
      const reg = await models.categoria.find({})
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
      const reg = await models.categoria.findByIdAndUpdate(
        {
          _id: req.body._id
        },
        {
          nombre: req.body.nombre,
          descripcion: req.body.descripcion
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
      const reg = await models.categoria.findByIdAndDelete({_id: req.body._id})
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
      const reg = await models.categoria.findByIdAndUpdate({_id: req.body._id}, {estado: 1})
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
      const reg = await models.categoria.findByIdAndUpdate({_id: req.body._id}, {estado: 0})
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      })
      next(e)
    }
  }
}