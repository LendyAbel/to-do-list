import jsonServer from 'json-server'
import auth from 'json-server-auth'

const app = jsonServer.create()
const router = jsonServer.router('../api/data.json')
const middlewares = jsonServer.defaults()

app.db = router.db

app.use(middlewares)
app.use(auth)
app.use(router)
app.listen(3001, () => {
  console.log('JSON Server is running on port 3001')
})
