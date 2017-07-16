var gulp = require('gulp')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var gap = require('gulp-append-prepend')

var root = '../Vocabulary'
var jsPath = root + '/src/js/index.js'
var cssPath = root + '/src/css/index.css'
var questionHtmlPath = root + '/src/html/Question_html.html'
var answerHtmlPath = root + '/src/html/Answer_html.html'
var distPath = root + '/dist'


gulp.task('generateTest', function () {
  gulp.src(answerHtmlPath)
    .pipe(rename('test.html'))
    .pipe(gulp.dest(distPath))
    .pipe(gap.appendText('<style>'))
    .pipe(gap.appendFile(cssPath))            
    .pipe(gap.appendText('</style>'))
    .pipe(gap.appendText('<script>'))
    .pipe(gap.appendFile(jsPath))            
    .pipe(gap.appendText('</script>'))
    .pipe(gulp.dest(distPath))
})

gulp.task('composite', function () {
  gulp.src(answerHtmlPath)
    .pipe(rename('Answer.html'))
    .pipe(gap.appendText('<script>'))
    .pipe(gap.appendFile(jsPath))            
    .pipe(gap.appendText('</script>'))
    .pipe(gulp.dest(distPath))
})

gulp.task('copyCss', function () {
  gulp.src(cssPath)
    .pipe(gulp.dest(distPath))
})

gulp.task('copyQuestionHtml', function () {
  gulp.src(questionHtmlPath)
    .pipe(rename('Question.html'))
    .pipe(gulp.dest(distPath))
})

gulp.task('watchComposition', function () {
  gulp.watch([jsPath, answerHtmlPath], ['composite', 'generateTest'])
})

gulp.task('watchCss', function () {
  gulp.watch(cssPath, ['copyCss', 'generateTest'])
})

gulp.task('watchQustionHtml', function () {
  gulp.watch(questionHtmlPath, ['copyQuestionHtml'])
})

gulp.task('default', ['composite', 'copyQuestionHtml', 'copyCss', 'generateTest', 'watchComposition', 'watchCss', 'watchQustionHtml'])