import { FastifyInstance } from "fastify";

export async function medicationRoutes(fastify: FastifyInstance) {
  fastify.get("/medications", async (_, reply) => {
    console.log("GET /medications");
    reply.send({ medications: [] });
  });

  fastify.post("/medications", async (request, reply) => {
    console.log("request.body", request.body);
    reply.send({ id: "id" });
  });
}
