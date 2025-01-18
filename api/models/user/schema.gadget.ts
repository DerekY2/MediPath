import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://medipath1.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "06DHymLZbt6r",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "L6r4Dvdz_dMD",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "S7pvICkS6gkw",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "L-15EETaJAwe",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "LSKx48LefONt",
    },
    firstName: { type: "string", storageKey: "mlDXpP3iusPu" },
    googleImageUrl: { type: "url", storageKey: "hkYzzk1CjLRS" },
    googleProfileId: { type: "string", storageKey: "tyUyAt0SQSpO" },
    lastName: { type: "string", storageKey: "YWM7F6S1__vW" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "8xNpxjyp48_C",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "uPsHOU-vgyJr",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "YljUljU7CtiI",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "09OqxCEKsCqb",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "NSUUdpvKzx43",
    },
  },
};
