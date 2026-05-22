import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "@digestengine/sanity-schema";

export default defineConfig({
  projectId: "wiokyeq0",
  dataset: "production",
  title: "Digest Engine Marketing Studio",
  basePath: "/",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});