import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.',
        }
      ],
    }),
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: './index.html',
        contentscript:"./public/content-script.js"
      },
      output:{
        entryFileNames : chunk=>{ /// require to bundle the contentscript which has 
          if(chunk.name == "contentscript"){
            return "content-script.js";
          }
          return "assets/[name].js"
        },
        assetFileNames:"assets/[name][extname]"
      }
    },
  },
});