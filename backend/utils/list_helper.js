const {nanoid} = require('nanoid')

const generateId = () => {
  return nanoid(6)
}

module.exports = { generateId }
