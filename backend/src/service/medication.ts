import { db } from "../db/database";

class MedicationService {
  public findAll = async () => {
    const medications = await db
      .selectFrom("medications")
      .select(["id", "name"])
      .execute();
    return medications;
  };

  public findOne = async (id: number) => {
    const medication = await db
      .selectFrom("medications")
      .select(["id", "name"])
      .where("id", "=", id)
      .executeTakeFirst();
    return medication;
  };
}

export default new MedicationService();
