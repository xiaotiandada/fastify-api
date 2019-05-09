const routes = require('./routes');
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mycargarage')
.then(()=>console.log('MongoDB connected...'))
.catch(err=>console.log(err))

// Import Swagger Options
const swagger = require('./config/swagger')

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})
// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

routes.forEach((route, index) => {
  fastify.route(route)
 })

  
// Declare a route
fastify.get('/', (request, reply) => {
reply.send({ hello: 'world' })
})

// Run the server!
const start = async () => {
try {

  await fastify.listen(3000)
  fastify.swagger()
  fastify.log.info(`listening on ${fastify.server.address().port}`)
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}
}
start()
