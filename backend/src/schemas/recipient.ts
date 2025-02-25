"use strict";
import { FromSchema } from "json-schema-to-ts";

const recipient = {
  type: "object",
  properties: {
    id: { type: "number" },
    first_name: { type: "string" },
    last_name: { type: "string" },
    prescriptions: {
      type: "array",
    },
  },
} as const;

export const findAll = {
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: recipient,
        },
      },
      required: ["data"],
    },
  },
};

export const findOne = {
  response: {
    200: recipient,
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
  },
} as const;

export const insertOne = {
  body: {
    type: "object",
    properties: {
      first_name: { type: "string" },
      last_name: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "number" },
      },
    },
  },
};

export type Recipient = FromSchema<typeof recipient>;
export type RecipientFindOneParams = FromSchema<typeof findOne.params>;
