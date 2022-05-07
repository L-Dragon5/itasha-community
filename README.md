# Itasha Community Site
Web application being used to become a global database for itasha vehicles.

Built on Laravel with a ReactJS + InertiaJS + ChakraUI

## Requirements
* MySQL/MariaDB Server
* PHP >= 8.0.0
* PHP Extensions: BCMath, Ctype, JSON, Mbstring, OpenSSL, PDO, XML
* Composer
* NodeJS

## Ubuntu 20.04 Installation with Nginx
1. Make sure server is up to date
   1. `apt-get update && apt-get upgrade`
2. Instal NGINX
3. Install MariaDB (newest version that supports large index keys by default)
4. Secure MariaDB installation
   1. `mysql_secure_installation`
5. Setup firewall
6. Install PHP, extensions, and other tools
7. Update PHP settings to process for Nginx
   1. `nano /etc/php/<version>/fpm/php.ini`
   2. `memory_limit = 256M`
   3. `upload_max_filesize = 64M`
   4. `cgi.fix_pathinfo=0`
8. Enable Gzip Compression
9. Clone repository into /var/www/html. Rename if you want to.
10. Setup nginx to have permission over the folder
    1.  `chown -R www-data:www-data /var/www/html/<Folder Name>`
    2.  `chmod -R 755 /var/www/html/<Folder Name>`
11. Setup nginx sites-available for folder. Create symbolic link to sites-enabled
12. Restart Nginx to refresh changes
    1.  `systemctl restart nginx.service`
13. Go into MariaDB and create a new database for the website
    1.  `CREATE DATABASE <database name>;`

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
7. Create database tables
   * `php artisan migrate`
   * If you want it seeded, then `php artisan migrate --seed`
   * You can wipe and seed again by doing `php artisan migrate:fresh --seed`
8. Generate encryption keys for API Auth
   * `php artisan passport:install`
9. Setup public symbolic link to storage folder
   * `php artisan storage:link`

## SSR
`node public/js/ssr.js`

`pidof node`
`kill <num>`

## License
The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
