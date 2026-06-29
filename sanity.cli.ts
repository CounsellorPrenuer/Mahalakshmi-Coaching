import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_PROJECT_ID || "jaefsos8";

export default defineCliConfig({
  api: {
    projectId,
    dataset: "production",
  },
  studioHost: "mahalakshmi-coaching",
  deployment: {
    appId: "zj952ynebx0swjj96sj0uqiz",
  },
});
