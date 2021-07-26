import jwt from 'jsonwebtoken'

export const signToken = (payload, secret, options = {}) =>
  jwt.sign(payload, secret, options)
