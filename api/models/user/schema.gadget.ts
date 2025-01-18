import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://dmedipath.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "XWUG9f8AMrXw",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "ILWn-XKRJuwB",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "NtYwOQG6sNhO",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "eQCBydiVykP2",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "uINfQEufB0aA",
    },
    firstName: { type: "string", storageKey: "9fhKjBoMI4OZ" },
    googleImageUrl: { type: "url", storageKey: "0Kk4jTl4c-fM" },
    googleProfileId: { type: "string", storageKey: "3vBXe-XWcfR-" },
    lastName: { type: "string", storageKey: "6kxupYsMk2q4" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "bSxPMRxbVO4n",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "gReKi3EvBCIC",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "XFRS0iyFzzRJ",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "K1jLEzmf8nZv",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "p29t5E34KIRz",
    },
  },
};
