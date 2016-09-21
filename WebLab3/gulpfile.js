//
//  gulpfile.js
//  WebLab2
//
//  Created on 13/09/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

var gulp = require('gulp');
var babel = require('gulp-babel');
var print = require('gulp-print')

gulp.task('js', function() {
    return gulp.src('./js/*.js')
        .pipe(print())// #1. select all js files in the app folder
        .pipe(babel({ presets: ['es2015'] }))    // #3. transpile ES2015 to ES5 using ES2015 preset
        .pipe(gulp.dest('build'));               // #4. copy the results to the build folder
});
