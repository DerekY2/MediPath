// Sets up the API client for interacting with your backend. 
// For your API reference, visit: https://docs.gadget.dev/api/medipath
import { Client } from "@gadget-client/medipath";

export const api = new Client({ environment: window.gadgetConfig.environment });
