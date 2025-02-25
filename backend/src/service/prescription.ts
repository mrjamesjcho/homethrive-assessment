import { db } from "../db/database";
import {
  DoseSchedule as DoseScheduleDB,
  Prescription as PrescriptionDB,
} from "../db/types";
import { DoseScheduleInsertBody } from "../schemas/dosage_schedule";
import { Prescription, PrescriptionInsertBody } from "../schemas/prescription";
import DoseScheduleService from "./dose_schedule";

class PrescriptionService {
  public toApi = (prescription: PrescriptionDB): Prescription => {
    return {
      ...prescription,
      start_date: prescription.start_date.toISOString(),
      end_date: prescription.end_date.toISOString(),
    };
  };

  public insertOne = async (body: PrescriptionInsertBody) => {
    console.log("-----body", body);
    // insert prescription and dose schedules in a transaction
    let prescriptionInsertResult: PrescriptionDB | undefined;
    let doseScheduleInsertResult: DoseScheduleDB[] = [];
    await db.transaction().execute(async (trx) => {
      prescriptionInsertResult = await trx
        .insertInto("prescriptions")
        .values(body)
        .returning([
          "id",
          "medication_id",
          "recipient_id",
          "dosage",
          "dosage_unit",
          "frequency",
          "start_date",
          "end_date",
          "active",
        ])
        .executeTakeFirstOrThrow();

      // create dose schedules
      const startDate = new Date(body.start_date);
      const endDate = new Date(body.end_date);
      const frequency = body.frequency;
      const dosageDate = new Date(startDate);
      const doseSchedules: DoseScheduleInsertBody[] = [];
      while (dosageDate <= endDate) {
        doseSchedules.push({
          prescription_id: prescriptionInsertResult.id,
          recipient_id: body.recipient_id,
          scheduled_at: dosageDate.toISOString(),
        });
        switch (frequency) {
          case "day":
            dosageDate.setDate(dosageDate.getDate() + 1);
            break;
          case "week":
            dosageDate.setDate(dosageDate.getDate() + 7);
            break;
        }
      }

      doseScheduleInsertResult = await trx
        .insertInto("dose_schedules")
        .values(doseSchedules)
        .returning([
          "id",
          "prescription_id",
          "recipient_id",
          "scheduled_at",
          "taken",
        ])
        .execute();
    });

    if (!prescriptionInsertResult) {
      throw new Error("Failed to insert prescription");
    }

    let newPrescription = this.toApi(prescriptionInsertResult);
    newPrescription["dose_schedule"] = doseScheduleInsertResult.map((ds) =>
      DoseScheduleService.toApi(ds)
    );

    console.log("newPrescription", newPrescription);
    return newPrescription;
  };
}

export default new PrescriptionService();
