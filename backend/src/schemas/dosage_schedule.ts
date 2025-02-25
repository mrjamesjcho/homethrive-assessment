import { FromSchema } from "json-schema-to-ts";

export const doseSchedule = {
  type: "object",
  properties: {
    id: { type: "number" },
    prescription_id: { type: "number" },
    recipient_id: { type: "number" },
    scheduled_at: { type: "string" },
    taken: { type: "boolean" },
  },
  required: ["id", "prescription_id", "recipient_id", "scheduled_at", "taken"],
  additionalProperties: false,
} as const;

export const doseScheduleRecipient = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    recipient_id: { type: "number" },
    scheduled_at: { type: "string" },
    taken: { type: "boolean" },
    dosage: { type: "number" },
    dosage_unit: { type: "string" },
  },
  required: ["id", "first_name", "last_name"],
  additionalProperties: false,
};

export const findAllByRecipientId = {
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "array",
        },
      },
      required: ["data"],
    },
  },
  querystring: {
    type: "object",
    properties: {
      recipient_id: { type: "string" },
    },
    required: ["recipient_id"],
    additionalProperties: false,
  },
} as const;

export const insertOne = {
  body: {
    type: "object",
    properties: {
      prescription_id: { type: "number" },
      recipient_id: { type: "number" },
      scheduled_at: { type: "string" },
    },
    required: ["prescription_id", "recipient_id", "scheduled_at"],
    additionalProperties: false,
  },
} as const;

export const updateOne = {
  response: {
    200: doseSchedule,
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
    required: ["id"],
    additionalProperties: false,
  },
  body: {
    type: "object",
    properties: {
      taken: { type: "boolean" },
    },
    required: ["taken"],
    additionalProperties: false,
  },
} as const;

export type DoseSchedule = FromSchema<typeof doseSchedule>;
export type DoseScheduleFindAllByRecipientIdQuery = FromSchema<
  typeof findAllByRecipientId.querystring
>;
export type DoseScheduleInsertBody = FromSchema<typeof insertOne.body>;
export type DoseScheduleUpdateOneParams = FromSchema<typeof updateOne.params>;
export type DoseScheduleUpdateOneBody = FromSchema<typeof updateOne.body>;
