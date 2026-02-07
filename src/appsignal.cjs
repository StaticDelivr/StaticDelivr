require("dotenv").config();

const { Appsignal } = require("@appsignal/nodejs");

new Appsignal({
  active: true,
  name: "StaticDelivr (Homepage)",
  pushApiKey: process.env.APPSIGNAL_PUSH_API_KEY,
  disableDefaultInstrumentations: [
    // Add the following line inside the list
    "@opentelemetry/instrumentation-http",
  ]
});