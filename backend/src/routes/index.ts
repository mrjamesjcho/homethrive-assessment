import { recipientRoutes } from "./recipients";
import { medicationRoutes } from "./medications";
import { FastifyInstance } from "fastify";

export default async (fastify: FastifyInstance) => {
  fastify.register(recipientRoutes, { prefix: "/recipients" });
  fastify.register(medicationRoutes, { prefix: "/medications" });
};
