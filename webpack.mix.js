const mix = require('laravel-mix');

/* Testing to see what takes up so much space.
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
mix.webpackConfig({
  plugins: [new BundleAnalyzerPlugin()],
});
*/

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js').react();
