import { Long } from 'mongodb'
import mongoose, {Schema} from 'mongoose'

const ventaSchema = new Schema({
  usuario: { type: String, maxlength: 50, required: true, ref: 'usuario'},
  persona: { type: String, maxlength: 50, required: true, ref: 'persona'},
  tipoComprobante: { type: String, maxlength: 50, required: true},
  numComprobante: { type: Number, maxlength: 255, required: true},
  serieComprobante: { type: String, maxlength: 7},
  impuesto: { type: Number, maxlength: 255, required: true},
  total: { type: Number, maxlength: 255, required: true},
  detalles: [
    {
    _id: {
      type: String,
      required: true
    },
    articulo:{
      type: String,
      required: true
    },
    cantidad:{
      type: Number,
      required: true
    },
    precio:{
      type: Number,
      required: true
    },
    dscto:{
      type: Number,
      required: true
    }
  }],
  nombre: { type: String, maxlength: 50 },
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
})

const venta = mongoose.model('venta', ventaSchema)

export default venta