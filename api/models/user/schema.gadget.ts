import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://medipath.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "dOQDymp9LvQ7",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "WrzIkQny6XMk",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "zph0epYHRueZ",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "BgQTw7giSybl",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "nMlmg8mCrwCm",
    },
    firstName: { type: "string", storageKey: "_fgpN4dYIK__" },
    googleImageUrl: { type: "url", storageKey: "5olOv_Ww-moW" },
    googleProfileId: { type: "string", storageKey: "7fKo7HwuZVfW" },
    lastName: { type: "string", storageKey: "pbDx8xpm-Xj1" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "zYiCySHoCk7l",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "032PJpKTnyoi",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "9OwHtHNHb4Yd",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "iiD3UgTH5Yxj",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "ZG3IcKFVAOCg",
    },
  },
};
