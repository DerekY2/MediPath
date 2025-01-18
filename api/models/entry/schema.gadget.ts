import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "entry" model, go to https://medipath.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "OQ9_PHDPTLMa",
  fields: {
    diagnosis: {
      type: "string",
      validations: { required: true },
      storageKey: "sWTwCZva_gcd",
    },
    embedding: { type: "vector", storageKey: "wh_-6tCJxsl2" },
    symptoms: {
      type: "string",
      validations: { required: true },
      storageKey: "Ka7CpxV7RPgR",
    },
  },
};
