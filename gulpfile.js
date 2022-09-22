const gulp = require("gulp");
const ts = require("gulp-typescript");
var tsProject = ts.createProject('tsconfig.json',{ noImplicitAny: true });
const {compilerOptions} = require("./tsconfig.json")

gulp.task("default", function () {
  var tsResult = gulp.src("src/**/*.ts").pipe(tsProject());
  return tsResult.js.pipe(gulp.dest(compilerOptions.outDir)); 
});