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

export type Medication = FromSchema<typeof medication>;
