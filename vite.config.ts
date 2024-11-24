import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/tests/vitest-setup.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
    },
  },
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({ autoImportComponentCase: "pascal" }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".ts", ".vue"],
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },

  server: {
    port: 3000,
  },
});
