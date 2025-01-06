import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { routes } from "./routes";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

const app = fastify().withTypeProvider<ZodTypeProvider>()

// Cors
app.register(fastifyCors, { origin: '*'})

//Validations from zod
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// Swagger
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Users API',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

// Routes 
app.register(routes)

app.listen({ port: 3333 }).then(() =>
  console.log('Server running in the port 3333...')
)