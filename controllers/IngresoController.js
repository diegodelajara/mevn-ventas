import models from '../models'

async function aumentarStock(idArticulo, cantidadArticulo) {
  const { stock } = await models.articulo.findOne({_id: idArticulo})
  const newStock = parseInt(cantidadArticulo) + parseInt(stock)
  const reg = await models.articulo.findByIdAndUpdate(
    { _id: idArticulo },
    { stcok: newStock }
  )
}
async function disminuirStock(idArticulo, cantidadArticulo) {
  const { stock } = await models.articulo.findOne({_id: idArticulo})
  const newStock = parseInt(stock) - parseInt(cantidadArticulo)
  const reg = await models.articulo.findByIdAndUpdate(
    { _id: idArticulo },
    { stcok: newStock }
  )
}

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.ingreso.create(req.body)
      // Actualizar stock
      const detalles = req.body.detalles
      detalles.map(articulo => aumentarStock(articulo._id, articulo.cantidad))
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
      const reg = await models.ingreso.findOne({_id: req.query._id})
      .populate('usuario', { nombre: 1 })
      .populate('persona', { nombre: 1 })
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
  queryCodigo: async (req, res, next) => {
    try {
      const reg = await models.ingreso.findOne({codigo: req.query.codigo})
      .populate('categoria', { nombre: 1 })
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
      const reg = await models.ingreso.find(
        {
          $or:[
            { 'numComprobante': new RegExp(valor, 'i') },
            { 'serieComprobante': new RegExp(valor, 'i') }
          ]
        },
        // parametros que excluye al listar
        {
          // _id: 0,
          // estado: 0,
          // createdAt: 0,
          // descripcion: 0
        }
      )
      .populate('usuario', {nombre: 1})
      .populate('persona', {nombre: 1})
      .sort({createdAt: -1})
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      })
      next(e)
    }
  },
  // update: async (req, res, next) => {
  //   try {
  //     const reg = await models.ingreso.findByIdAndUpdate(
  //       {
  //         _id: req.body._id
  //       },
  //       {
  //         nombre: req.body.nombre,
  //         descripcion: req.body.descripcion
  //       }
  //     )
  //     res.status(200).json(reg)
  //   } catch (e) {
  //     res.status(500).send({
  //       message: 'Ocurrió un error: ' + e
  //     })
  //     next(e)
  //   }
  // },
  // remove: async (req, res, next) => {
  //   try {
  //     const reg = await models.ingreso.findByIdAndDelete({_id: req.body._id})
  //     res.status(200).json(reg)
  //   } catch (e) {
  //     res.status(500).send({
  //       message: 'Ocurrió un error'
  //     })
  //     next(e)
  //   }
  // },
  activate: async (req, res, next) => {
    try {
      const reg = await models.ingreso.findByIdAndUpdate({_id: req.body._id}, {estado: 1})
      // Actualizar stock
      const detalles = reg.detalles
      detalles.map(articulo => aumentarStock(articulo._id, articulo.cantidad))
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
      const reg = await models.ingreso.findByIdAndUpdate({_id: req.body._id}, {estado: 0})
      // Actualizar stock
      const detalles = reg.detalles
      detalles.map(articulo => disminuirStock(articulo._id, articulo.cantidad))
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      })
      next(e)
    }
  },
  grafico12meses: async (req, res, next) => {
    try {
      const reg = await models.ingreso.aggregate(
        [
          {
            $group: {
              _id: { 
                  month: { $month:"createdAt" },
                  year: { $year: "createdAt" }
              },
              total: {
                $sum: "$total"
              },
              numero: {
                $sum: 1
              }
            }
          },
          {
            $sort: {
              "_id.year": -1,
              "_id.month": -1
            }
          }
        ]
      ).limit(12)
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      })
      next(e)
    }
  },
  consultaFechas: async (req, res, next) => {
    try {
      let start = req.query.start
      let end = req.query.end
      const reg = await models.ingreso.find(
        { "createdAt": { "$ste": start, "$lt": end }}
      )
      .populate('usuario', {nombre: 1})
      .populate('persona', {nombre: 1})
      .sort({createdAt: -1})
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error'
      })
      next(e)
    }
  }
}