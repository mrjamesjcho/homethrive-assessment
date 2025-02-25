import { db } from "../db/database";

class MedicationService {
  public findAll = async () => {
    const medications = await db
      .selectFrom("medications")
      .select(["id", "name"])
      .execute();
    return medications;
  };
}

export default new MedicationService();
