import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_PROJECT_ID || "jaefsos8";

export default defineConfig({
  name: "mahalakshmi-coaching",
  title: "Mahalakshmi Coaching",
  projectId,
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
