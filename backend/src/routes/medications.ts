import { FastifyInstance } from "fastify";
import MedicationService from "../service/medication";
import { findAll, MedicationFindOneParams } from "../schemas/medication";

export async function medicationRoutes(fastify: FastifyInstance) {
  fastify.get("/", { schema: findAll }, async (_, reply) => {
    const medications = await MedicationService.findAll();
    return { data: medications };
  });

  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as MedicationFindOneParams;
    console.log("GET /medications/:id", id);
    reply.send({ id });
  });

  fastify.patch("/:id", async (request, reply) => {
    console.log("request.body", request.body);
    reply.send({ id: "id" });
  });
}
