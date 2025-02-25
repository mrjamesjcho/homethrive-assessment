export type Medication = {
  id: number;
  name: string;
};

export type Prescription = {
  id: number;
  name: string;
  active: boolean;
  dosage: number;
  dosage_unit: string;
  frequency: string;
  start_date: string;
  end_date: string;
};

export type PrescriptionCreatePayload = {
  medication_id: number;
  recipient_id: number;
  dosage: number;
  dosage_unit: string;
  frequency: string;
  start_date: string;
  end_date: string;
};

export type Recipient = {
  id: number;
  first_name: string;
  last_name: string;
  prescriptions: Prescription[];
};

export type DoseSchedule = {
  id: number;
  name: string;
  scheduled_at: string;
  dosage: number;
  dosage_unit: string;
  taken: boolean;
};
