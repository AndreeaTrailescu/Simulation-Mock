import { DataStore } from "swagger-express-middleware-wrapper-lib";

export const createPrefilledDataStore = (store: DataStore) => {
  store.save(`/suites`, "767", {
    name: "GSIL and TRUCK template",
    description: "",
    testEnvironmentId: "",
    systemUnderTestId: "",
    id: "767",
  });
};
