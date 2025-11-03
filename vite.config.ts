import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import purgecss from 'vite-plugin-purgecss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    purgecss({
      content: ['./src/**/*.{ts,tsx,html}'],
      safelist: {
        standard: [/^toast/],
        deep: [],
        greedy: []
      }
    })
  ]
});
