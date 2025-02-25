import { sql } from "kysely";
import { db } from "../db/database";
import { DoseSchedule as DoseScheduleDB } from "../db/types";
import {
  DoseSchedule,
  DoseScheduleUpdateOneBody,
} from "../schemas/dosage_schedule";

class DoseScheduleService {
  public toApi = (doseSchedule: DoseScheduleDB): DoseSchedule => {
    return {
      ...doseSchedule,
      scheduled_at: doseSchedule.scheduled_at.toISOString(),
    };
  };

  public findAllByRecipientId = async (recipientId: number) => {
    const doseSchedules = await db
      .selectFrom("dose_schedules")
      .leftJoin(
        "prescriptions",
        "prescriptions.id",
        "dose_schedules.prescription_id"
      )
      .leftJoin("medications", "medications.id", "prescriptions.medication_id")
      .select([
        "dose_schedules.id",
        "dose_schedules.scheduled_at",
        "dose_schedules.taken",
        "prescriptions.dosage",
        "prescriptions.dosage_unit",
        "medications.name",
      ])
      .where("dose_schedules.recipient_id", "=", recipientId)
      .where(
        sql<string>`dose_schedules.scheduled_at::date`,
        ">=",
        sql<string>`now()::date`
      )
      .orderBy("dose_schedules.scheduled_at", "asc")
      .orderBy("medications.name", "asc")
      .execute();
    return doseSchedules;
  };

  public updateOne = async (id: number, body: DoseScheduleUpdateOneBody) => {
    console.log("id", id);
    const result = await db
      .updateTable("dose_schedules")
      .set(body)
      .where("id", "=", id)
      .returning([
        "id",
        "scheduled_at",
        "prescription_id",
        "recipient_id",
        "taken",
      ])
      .executeTakeFirstOrThrow();
    console.log("result", result);
    return this.toApi(result);
  };
}

export default new DoseScheduleService();
