const info = (...params) => {
    console.log('-----------------')
    console.log(...params)
}

const error = (...params) => {
    console.log('xxxxxxxxxxxxxxxxxxxx')
    console.error(...params)
}

module.exports = {info, error}