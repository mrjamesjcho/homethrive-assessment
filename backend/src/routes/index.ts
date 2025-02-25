import { FastifyInstance } from "fastify";
import { medicationRoutes } from "./medications";
import { prescriptionRoutes } from "./prescriptions";
import { recipientRoutes } from "./recipients";
import { doseScheduleRoutes } from "./dose_schedules";

export default async (fastify: FastifyInstance) => {
  fastify.register(doseScheduleRoutes, { prefix: "/dose_schedules" });
  fastify.register(medicationRoutes, { prefix: "/medications" });
  fastify.register(prescriptionRoutes, { prefix: "/prescriptions" });
  fastify.register(recipientRoutes, { prefix: "/recipients" });
};
