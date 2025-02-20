import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("recipients")
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
    .createTable("medications")
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
    .createTable("perscriptions")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("medication_id", "integer", (col) =>
      col.references("medications").notNull()
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
    .createTable("recipient_perscriptions")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("recipient_id", "integer", (col) =>
      col.references("recipients").notNull()
    )
    .addColumn("perscription_id", "integer", (col) =>
      col.references("perscriptions").notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();

  await db.schema
    .createTable("doses")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("perscription_id", "integer", (col) =>
      col.references("perscriptions").notNull()
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
