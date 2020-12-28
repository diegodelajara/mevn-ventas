import mongoose, {Schema} from 'mongoose'

const ingresoSchema = new Schema({
  usuario: { type: Schema.ObjectId, ref: 'usuario', required: true},
  persona: { type: Schema.ObjectId, ref: 'persona', required: true},
  tipoComprobante: { type: String, maxlength: 50, required: true},
  numComprobante: { type: String, maxlength: 255, required: true},
  serieComprobante: { type: String, maxlength: 7},
  impuesto: { type: Number, maxlength: 255, required: true},
  total: { type: Number, maxlength: 255, required: true},
  detalles: [{
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
    }
  }],
  nombre: { type: String, maxlength: 50 },
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
})

const ingreso = mongoose.model('ingreso', ingresoSchema)

export default ingreso