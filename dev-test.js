const { randomBytes } = require("crypto")
const {InternalCache} = require("./dist/functions/database")
const { performance } = require('perf_hooks');

let cache = new InternalCache()



function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;}



//add to cache
for (let index = 0; index < 1000000; index++) {
    cache.add(index,makeid(1000000))
}

var startTime = performance.now()
console.log(cache.get("1000"))
var endTime = performance.now()

console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)



// const gulp = require("gulp");
// const ts = require("gulp-typescript");
// const tsProject = ts.createProject("tsconfig.json");
// var del = require('del');
// const {series } = gulp


// let tsJob = tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
// gulp.task("default", function () {
//   return series(del["dist"],tsJob) 
// });