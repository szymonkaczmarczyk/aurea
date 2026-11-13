import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://aurea.example",
  trailingSlash: "ignore",
  server: { port: 4710, host: "127.0.0.1" }
});
