import { FastifyInstance } from "fastify";
import { findAll } from "../schemas/medication";
import MedicationService from "../service/medication";

export async function medicationRoutes(fastify: FastifyInstance) {
  fastify.get("/", { schema: findAll }, async (_, reply) => {
    const medications = await MedicationService.findAll();
    return { data: medications };
  });
}
