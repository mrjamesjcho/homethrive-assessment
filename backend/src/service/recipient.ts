import { db } from "../db/database";
import { RecipientInsert } from "../db/types";
import { Recipient } from "../schemas/recipient";

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
      .select(["id", "first_name", "last_name"])
      .where("id", "=", id)
      .executeTakeFirst();

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
