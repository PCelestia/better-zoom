// hehe shush eslint

import { task, src, dest, series, parallel } from "gulp";
import del from "del";
import gulpif from "gulp-if";

import pug from "gulp-pug";
import sass from "gulp-sass";
import sasscompiler from "node-sass";
import typescript from "gulp-typescript";
import { init as initsourcemaps, write as writesourcemaps } from "gulp-sourcemaps";

const production: boolean = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod"

task("clean", () => {
   return del("build");
});

task("pug", () => {
   return src("src/pug/pages/**/*.pug").pipe(pug()).pipe(dest("build/pages"));
});

(sass as any).compiler = sasscompiler;
task("sass", () => {
   return src("src/sass/**/*.scss").pipe(sass()).pipe(dest("build/styles"));
});

task("typescript", () => {
   const { compilerOptions: compileropts } = require("./tsconfig.json");
   if (production) delete compileropts.sourceMap;
   return src("src/ts/**/*.ts").pipe(gulpif(production, initsourcemaps())).pipe(typescript(compileropts)).pipe(gulpif(production, writesourcemaps())).pipe(dest("build/scripts"));
});


export const build = series("clean", parallel("pug", "sass", "typescript"));
