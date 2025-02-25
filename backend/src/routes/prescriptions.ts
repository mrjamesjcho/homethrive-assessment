import { FastifyInstance } from "fastify";
import PrescriptionService from "../service/prescription";
import {
  insertOne,
  PrescriptionInsertBody,
  PrescriptionUpdateBody,
  PrescriptionUpdateOneParams,
  updateOne,
} from "../schemas/prescription";

export async function prescriptionRoutes(fastify: FastifyInstance) {
  fastify.post("/", { schema: insertOne }, async (request, reply) => {
    const body = request.body as PrescriptionInsertBody;
    const prescription = await PrescriptionService.insertOne(body);
    return prescription;
  });

  fastify.patch("/:id", { schema: updateOne }, async (request, reply) => {
    const { id } = request.params as PrescriptionUpdateOneParams;
    const body = request.body as PrescriptionUpdateBody;
    const prescription = await PrescriptionService.updateOne(Number(id), body);
    return prescription;
  });
}
