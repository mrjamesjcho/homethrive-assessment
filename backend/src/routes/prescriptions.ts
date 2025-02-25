import { FastifyInstance } from "fastify";
import PrescriptionService from "../service/prescription";
import { insertOne, PrescriptionInsertBody } from "../schemas/prescription";

export async function prescriptionRoutes(fastify: FastifyInstance) {
  fastify.post("/", { schema: insertOne }, async (request, reply) => {
    const body = request.body as PrescriptionInsertBody;
    const prescription = await PrescriptionService.insertOne(body);
    return prescription;
  });
}
