import { ColumnType, Generated } from 'kysely';

export interface Database {
  recipients: RecipientTable;
  medications: MedicationTable;
  perscriptions: PerscriptionTable;
  recipient_perscriptions: RecipientPerscriptionTable;
  doses: DoseTable;
}

export interface RecipientTable {
  id: Generated<number>;
  first_name: string;
  last_name: string;
  created_at: ColumnType<Date, string, never>;
  updated_at: ColumnType<Date, string, string>;
}

export interface MedicationTable {
  id: Generated<string>;
  name: string;
  active: boolean;
  created_at: ColumnType<Date, string, never>;
  updated_at: ColumnType<Date, string, string>;
}

export interface PerscriptionTable {
  id: Generated<number>;
  medication_id: number;
  dosage: number;
  dosage_unit: string;
  frequency: number;
  frequency_unit: string;
  start_date: ColumnType<Date, string, never>;
  end_date: ColumnType<Date, string, never>;
  created_at: ColumnType<Date, string, never>;
  updated_at: ColumnType<Date, string, string>;
  deleted_at: ColumnType<Date | null, string, string>;
}

export interface RecipientPerscriptionTable {
  id: Generated<number>;
  recipient_id: number;
  perscription_id: number;
  created_at: ColumnType<Date, string, never>;
  updated_at: ColumnType<Date, string, string>;
}

export interface DoseTable {
  id: Generated<number>;
  perscription_id: number;
  scheduled_at: ColumnType<Date, string, never>;
  taken: boolean;
  created_at: ColumnType<Date, string, never>;
  updated_at: ColumnType<Date, string, string>;
  deleted_at: ColumnType<Date | null, string, string>;
}
