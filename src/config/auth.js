import passport from 'passport'
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt'

import Employee from '../models/employee'

export const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.AUTH_SECRET_DEF,
}

passport.use(
  'jwt',
  new JwtStrategy(options, async (payload, done) => {
    const usr = await Employee.findById(payload.id.toString())
    if (!usr) return done(null, false)
    return done(null, usr)
  }),
)

passport.serializeUser((usr, done) => {
  if (!usr) return done(null, false)
  done(null, usr)
})

passport.deserializeUser((usr, done) => {
  if (!usr) return done(null, false)
  return done(null, usr)
})

export default passport
