import mongoose, {Schema} from 'mongoose'

const personaSchema = new Schema({
  tipoPersona: { type: String, maxlength: 50, required: true },
  nombre: { type: String, maxlength: 50, required: true },
  numeroDocumento:  { type: Number, maxlength: 10, required: true },
  tipoDocumento: { type: String, maxlength: 50, required: true },
  direccion: { type: String, maxlength: 255 },
  telefono: { type: String, maxlength: 20 },
  email: { type: String, maxlength: 50, unique: true },
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
})

const persona = mongoose.model('persona', personaSchema)

export default persona