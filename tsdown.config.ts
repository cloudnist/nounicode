import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["./src/index.ts"],
    format: ["esm", "cjs"],     
    dts: true,                
    sourcemap: false,            
    clean: true,               
    outDir: "dist",
    minify: true,
    treeshake: true
  }
]);
