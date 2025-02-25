import { FromSchema } from "json-schema-to-ts";

const medication = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
  },
} as const;

export const findAll = {
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: medication,
        },
      },
      required: ["data"],
    },
  },
};

export const findOne = {
  response: {
    200: medication,
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
} as const;

export type Medication = FromSchema<typeof medication>;
export type MedicationFindOneParams = FromSchema<typeof findOne.params>;
