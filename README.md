# Itasha Community Site
Web application being used to become a global database for itasha vehicles.

Built on Laravel with a ReactJS + InertiaJS + ChakraUI

## Requirements
* MongoDB
* PHP >= 8.0.0
* PHP Extensions: BCMath, Ctype, JSON, Mbstring, MongoDB, OpenSSL, PDO, XML
* Composer
* NodeJS

## Installation
1. Go into folder
2. Install composer modules
   * Development: `composer install`
   * Production: `composer install --no-dev --optimize-autoloader`
3. Install node modules
   * `npm install`
   * Development: `npm run dev` or `npm run watch`
   * Production: `npm run prod`
4. Change `.env.example` file into `.env`
5. Update entries within the `.env` file to match database and other information
   * If in production, be sure to set `APP_ENV=production` and `APP_DEBUG=false`
6. Generate a new key
   * `php artisan key:generate`
7. Setup public symbolic link to storage folder
   * `php artisan storage:link`

## SSR
`node public/js/ssr.js`

`pidof node`
`kill <num>`

## Serverless
`serverless deploy`
`php artisan sidecar:deploy --activate`

## License
The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
