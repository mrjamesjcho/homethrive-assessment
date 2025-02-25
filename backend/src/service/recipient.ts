import { db } from "../db/database";
import { RecipientInsert } from "../db/types";
import { Recipient } from "../schemas/recipient";
import { jsonArrayFrom } from "kysely/helpers/postgres";

class RecipientService {
  public findAll = async () => {
    const recipients = await db
      .selectFrom("recipients")
      .select(["id", "first_name", "last_name"])
      .execute();
    return recipients;
  };

  public findOne = async (id: number) => {
    const recipient = await db
      .selectFrom("recipients")
      .select((eb) => [
        "id",
        "first_name",
        "last_name",
        jsonArrayFrom(
          eb
            .selectFrom("prescriptions")
            .leftJoin(
              "medications",
              "medications.id",
              "prescriptions.medication_id"
            )
            .select([
              "prescriptions.id",
              "medications.name",
              "prescriptions.active",
              "prescriptions.dosage",
              "prescriptions.dosage_unit",
              "prescriptions.frequency",
              "prescriptions.start_date",
              "prescriptions.end_date",
            ])
        ).as("prescriptions"),
      ])
      .where("id", "=", id)
      .executeTakeFirst();

    console.log("recipient", recipient);
    return recipient;
  };

  public insertOne = async (recipient: RecipientInsert) => {
    const result = await db
      .insertInto("recipients")
      .values(recipient)
      .returning("id")
      .execute();
    return { id: result[0].id };
  };
}

export default new RecipientService();
