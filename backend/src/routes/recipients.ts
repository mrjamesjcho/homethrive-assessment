import { FastifyInstance, FastifyRequest } from "fastify";
import { findAll, findOne, RecipientParams } from "../schemas/recipient";
import RecipientService from "../service/recipient";
import { NotFoundError } from "../errors";

export async function recipientRoutes(fastify: FastifyInstance) {
  fastify.get("/", { schema: findAll }, async (_request, _reply) => {
    console.log("GET /recipients");
    const recipients = await RecipientService.findAll();
    console.log("recipients", recipients);
    return { data: recipients };
  });

  fastify.get(
    "/:id",
    { schema: findOne },
    async (request: FastifyRequest, reply) => {
      const params = request.params as RecipientParams;
      const recipient = await RecipientService.findOne(Number(params.id));
      if (!recipient) {
        throw new NotFoundError("Recipient not found");
      }
      return recipient;
    }
  );
}
