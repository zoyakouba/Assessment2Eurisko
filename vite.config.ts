import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from "@tailwindcss/vite";
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    tsconfigPaths(),
    tailwindcss(),
    viteMockServe ({
      mockPath: 'mock',
      enable: true,
      }),
  ],
});
