import { db } from "../database";
import medications from "../seeds/medications.json";
import recipients from "../seeds/recipients.json";

const seedRecipients = async () => {
  console.log("Seeding recipients...");
  await db.insertInto("recipients").values(recipients).execute();
  console.log("Seeded recipients");
};

const seedMedications = async () => {
  console.log("Seeding medications...");
  await db.insertInto("medications").values(medications).execute();
  console.log("Seeded medications");
};

const main = async () => {
  try {
    await seedRecipients();
    await seedMedications();
  } catch (error) {
    console.error(error);
  } finally {
    await db.destroy();
  }
};

main();
