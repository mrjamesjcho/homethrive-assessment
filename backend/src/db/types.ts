import { ColumnType, Generated } from "kysely";

export interface Database {
  recipients: RecipientTable;
  medications: MedicationTable;
  prescriptions: PrescriptionTable;
  dose_schedules: DoseScheduleTable;
}

export interface RecipientTable {
  id: Generated<number>;
  first_name: string;
  last_name: string;
  created_at: ColumnType<Date, never, never>;
  updated_at: ColumnType<Date, never, string>;
  deleted_at: ColumnType<Date | null, never, string>;
}

export interface MedicationTable {
  id: Generated<number>;
  name: string;
  active: ColumnType<boolean, never, boolean>;
  created_at: ColumnType<Date, never, never>;
  updated_at: ColumnType<Date, never, string>;
  deleted_at: ColumnType<Date | null, never, string>;
}

export interface PrescriptionTable {
  id: Generated<number>;
  medication_id: number;
  recipient_id: number;
  frequency: number;
  frequency_unit: string;
  dosage: number;
  dosage_unit: string;
  start_date: ColumnType<Date, string, never>;
  end_date: ColumnType<Date, string, never>;
  created_at: ColumnType<Date, never, never>;
  updated_at: ColumnType<Date, never, string>;
  deleted_at: ColumnType<Date | null, never, string>;
}

export interface DoseScheduleTable {
  id: Generated<number>;
  prescription_id: number;
  patient_id: number;
  scheduled_at: ColumnType<Date, string, never>;
  taken: boolean;
  created_at: ColumnType<Date, never, never>;
  updated_at: ColumnType<Date, never, string>;
  deleted_at: ColumnType<Date | null, never, string>;
}

export type RecipientInsert = Omit<
  RecipientTable,
  "id" | "created_at" | "updated_at"
>;

export type Recipient = RecipientTable;
export type MedicationInsert = Omit<
  MedicationTable,
  "id" | "created_at" | "updated_at" | "deleted_at" | "active"
>;
export type PrescriptionInsert = Omit<
  PrescriptionTable,
  "id" | "created_at" | "updated_at" | "deleted_at"
>;
export type DoseScheduleInsert = Omit<
  DoseScheduleTable,
  "id" | "created_at" | "updated_at" | "deleted_at"
>;
