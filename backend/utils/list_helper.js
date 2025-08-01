const {nanoid} = require('nanoid')

const generateId = () => {
  return nanoid(6)
}

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

module.exports = { generateId, getTokenFrom }
