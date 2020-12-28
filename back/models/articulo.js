import mongoose, { Schema } from 'mongoose'

const articuloSchema = new Schema({
  categoria: { type: Schema.ObjectId, ref: 'categoria' },
  codigo: { type: String, maxlength: 64 },
  nombre: { type: String, maxlength: 64, unique: true, required: true},
  descripcion: { type: String, maxlength: 255},
  precioVenta: { type: Number, required: true},
  stock: { type: Number, required: true},
  estado: { type: Number, maxlength: 1, default: 1},
  createdAt: { type: Date, default: Date.now }
})

const articulo = mongoose.model('articulo', articuloSchema)
export default articulo