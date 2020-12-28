import jwt from 'jsonwebtoken'
import models from '../models'

async function checkToken(token) {
  let __id = null
  try {
    const {_id} = await jwt.decode(token)
    __id = _id
  } catch (e) {
      return false
  }
  const user = await models.usuario.findOne({_id:__id, estado: 1})
  if (user) {
    const token = await jwt.sign({_id: _id}, 'clavesecreta', {expiresIn: '1d'})
    return {
      token,
      rol: user.rol
    }
  } else return false
}

export default {
  encode: async _id => {
    const token = await jwt.sign({_id: _id}, 'clavesecreta', {expiresIn: '1d'})
    return token
  },
  decode: async token => {
    try {
      const { _id } = await jwt.verify(token, 'clavesecreta' )
      const user = await models.usuario.findOne({_id, estado: 1})
      return user
        ? user
        : false
    } catch (e) {
      const newToken = await checkToken(token)
      return newToken
    }
  }
}
