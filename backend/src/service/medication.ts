import { db } from "../db/database";
import { MedicationUpdateBody } from "../schemas/medication";

class MedicationService {
  public findAll = async () => {
    const medications = await db
      .selectFrom("medications")
      .select(["id", "name"])
      .execute();
  };

  public findOne = async (id: number) => {
    const medication = await db
      .selectFrom("medications")
      .select(["id", "name", "active"])
      .where("id", "=", id)
      .executeTakeFirst();
    return medication;
  };

  public updateOne = async (id: number, body: MedicationUpdateBody) => {
    const medication = await db
      .updateTable("medications")
      .set(body)
      .where("id", "=", id)
      .returning(["id", "name", "active"])
      .executeTakeFirst();
    return medication;
  };
}

export default new MedicationService();
