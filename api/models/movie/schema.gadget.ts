import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "movie" model, go to https://medipath1.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "nXX9dqgU_ycX",
  fields: {
    embedding: { type: "vector", storageKey: "ntwMG3d8c12a" },
    quote: {
      type: "string",
      validations: { required: true },
      storageKey: "0ae1Z2nbeCcG",
    },
    title: {
      type: "string",
      validations: { required: true },
      storageKey: "uSJPwyNASDAE",
    },
  },
};
