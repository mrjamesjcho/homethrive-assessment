import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("recipient")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("first_name", "text", (col) => col.notNull())
    .addColumn("last_name", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();

  await db.schema
    .createTable("medication")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("active", "boolean", (col) => col.notNull().defaultTo(true))
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();

  await db.schema
    .createTable("perscription")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("medication_id", "integer", (col) =>
      col.references("medication.id").notNull()
    )
    .addColumn("dosage", "integer", (col) => col.notNull())
    .addColumn("dosage_unit", "text", (col) => col.notNull())
    .addColumn("frequency", "integer", (col) => col.notNull())
    .addColumn("frequency_unit", "text", (col) => col.notNull())
    .addColumn("start_date", "timestamp", (col) => col.notNull())
    .addColumn("end_date", "timestamp", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("deleted_at", "timestamp")
    .execute();

  await db.schema
    .createTable("recipient_perscription")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("recipient_id", "integer", (col) =>
      col.references("recipient.id").notNull()
    )
    .addColumn("perscription_id", "integer", (col) =>
      col.references("perscription.id").notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();

  await db.schema
    .createTable("dose")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("perscription_id", "integer", (col) =>
      col.references("perscription.id").notNull()
    )
    .addColumn("scheduled_at", "timestamp", (col) => col.notNull())
    .addColumn("taken", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("deleted_at", "timestamp")
    .execute();
}
