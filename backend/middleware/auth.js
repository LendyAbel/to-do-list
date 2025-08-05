require('dotenv').config()

const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const auth = req.get('authorization')
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'token missing' })
  try {
    const token = auth.replace('Bearer ', '')
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'invalid token' })
  }
}

module.exports = { authMiddleware }
