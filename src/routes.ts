import { randomUUID } from "crypto";
import { FastifyTypedInstace } from "./types";
import { z } from 'zod';

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [{
  id: randomUUID(),
  name: 'Arthur',
  email: 'arthur@email.com'
}]

export async function routes(app: FastifyTypedInstace) {
  app.get('/users', {
    schema: {
      description: 'Get All Users.',
      tags: ['users'],
      response: {
        200: z.array(z.object({
          id: z.string().uuid(),
          name: z.string(),
          email: z.string()
        }))
      }
    }
  }, () => {
    return users;
  })

  app.post('/user', {
    schema: {
      tags: ['users'],
      description: "Adding new user to the array.",
      body: z.object({
        name: z.string(),
        email: z.string().email()
      }),
      response: {
        201: z.null().describe("User created.")
      }
    }
  }, async (request, reply) => {
    const { name, email } = request.body

    users.push({
      id: randomUUID(),
      name,
      email
    })

    return reply.status(201).send()
  })
}