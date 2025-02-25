import { FastifyInstance } from "fastify";
import {
  DoseScheduleFindAllByRecipientIdQuery,
  DoseScheduleUpdateOneBody,
  DoseScheduleUpdateOneParams,
  findAllByRecipientId,
  updateOne,
} from "../schemas/dosage_schedule";
import DoseScheduleService from "../service/dose_schedule";

export async function doseScheduleRoutes(fastify: FastifyInstance) {
  fastify.get("/", { schema: findAllByRecipientId }, async (request, reply) => {
    const { recipient_id } =
      request.query as DoseScheduleFindAllByRecipientIdQuery;
    console.log(request.query);
    const doseSchedules = await DoseScheduleService.findAllByRecipientId(
      Number(recipient_id)
    );
    return { data: doseSchedules };
  });

  fastify.patch("/:id", { schema: updateOne }, async (request, reply) => {
    console.log("request.body", request.body);
    console.log("request.params", request.params);
    const { id } = request.params as DoseScheduleUpdateOneParams;
    const body = request.body as DoseScheduleUpdateOneBody;
    const doseSchedule = await DoseScheduleService.updateOne(Number(id), body);
    return doseSchedule;
  });
}
