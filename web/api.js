// Sets up the API client for interacting with your backend. 
// For your API reference, visit: https://docs.gadget.dev/api/medipath1
import { Client } from "@gadget-client/medipath1";

export const api = new Client({ environment: window.gadgetConfig.environment });
