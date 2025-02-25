import { FastifyInstance, FastifyRequest } from "fastify";
import { NotFoundError } from "../errors";
import { findAll, findOne, RecipientFindOneParams } from "../schemas/recipient";
import RecipientService from "../service/recipient";

export async function recipientRoutes(fastify: FastifyInstance) {
  fastify.get("/", { schema: findAll }, async (_request, _reply) => {
    const recipients = await RecipientService.findAll();
    return { data: recipients };
  });

  fastify.get(
    "/:id",
    { schema: findOne },
    async (request: FastifyRequest, reply) => {
      const params = request.params as RecipientFindOneParams;
      const recipient = await RecipientService.findOne(Number(params.id));
      if (!recipient) {
        throw new NotFoundError("Recipient not found");
      }
      return recipient;
    }
  );
}
