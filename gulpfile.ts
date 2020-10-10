// hehe shush eslint

import { task, src, dest } from "gulp";
import del from "del";
import typescript from "gulp-typescript";

task("clean", async () => {
   return del("build");
});

task("typescript", async () => {
   const { compilerOptions: compileropts } = require("./tsconfig.json");
   return src("src/**/*.ts").pipe(typescript(compileropts)).pipe(dest("build"));
});
