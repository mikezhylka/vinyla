import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/vinyla-shop/",
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "/src/styles/utils/_mixins.scss" as *;
        @use "/src/styles/utils/colors.scss" as *;
        @use "/src/styles/utils/_globals.scss" as *;
        @use "/src/styles/_fonts.scss" as *;
        @use "/src/styles/utils/_vars.scss" as *;
      `
      },
    },
  },
});
