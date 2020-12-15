import mongoose, {Schema} from 'mongoose'

const usuarioSchema = new Schema({
  rol: { type:String, maxlength: 50, required: true },
  nombre: { type:String, maxlength: 50, required: true },
  numeroDocumento:  { type:Number, maxlength: 10, required: true },
  tipoDocumento: { type:String, maxlength: 50, required: true },
  direccion: { type:String, maxlength: 255 },
  telefono: { type:String, maxlength: 20 },
  email: { type:String, maxlength: 50, required: true, unique: true },
  password: { type:String, maxlength: 255, required: true },
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
})

const usuario = mongoose.model('usuario', usuarioSchema)

export default usuario