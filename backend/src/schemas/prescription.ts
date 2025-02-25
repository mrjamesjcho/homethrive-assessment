import { FromSchema } from "json-schema-to-ts";
import { it } from "node:test";
import { doseSchedule } from "./dosage_schedule";
import { DosageUnit, Frequency } from "../db/types";

export const prescription = {
  type: "object",
  properties: {
    id: { type: "number" },
    recipient_id: { type: "number" },
    medication_id: { type: "number" },
    dosage: { type: "number" },
    dosage_unit: { enum: Object.values(DosageUnit) },
    frequency: { enum: Object.values(Frequency) },
    start_date: { type: "string" },
    end_date: { type: "string" },
    active: { type: "boolean" },
    dose_schedule: {
      type: "array",
      items: doseSchedule,
    },
  },
  additionalProperties: false,
} as const;

export const insertOne = {
  body: {
    type: "object",
    properties: {
      recipient_id: prescription.properties.recipient_id,
      medication_id: prescription.properties.medication_id,
      dosage: prescription.properties.dosage,
      dosage_unit: prescription.properties.dosage_unit,
      frequency: prescription.properties.frequency,
      start_date: prescription.properties.start_date,
      end_date: prescription.properties.end_date,
    },
    required: [
      "recipient_id",
      "medication_id",
      "dosage",
      "dosage_unit",
      "frequency",
      "start_date",
      "end_date",
    ],
    additionalProperties: false,
  },
} as const;

export const updateOne = {
  response: {
    200: prescription,
    404: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
  body: {
    type: "object",
    properties: {
      active: { type: "boolean" },
    },
  },
} as const;

export type Prescription = FromSchema<typeof prescription>;
export type PrescriptionInsertBody = FromSchema<typeof insertOne.body>;
export type PrescriptionUpdateBody = FromSchema<typeof updateOne.body>;
export type PrescriptionUpdateOneParams = FromSchema<typeof updateOne.params>;
