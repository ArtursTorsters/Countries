

## Technology Stack

- **Backend**: Laravel 10 (PHP 8.2)
- **Frontend**: React with Inertia.js
- **CSS Framework**: Tailwind CSS
- **Database**: MySQL 8.0
- **Containerization**: Docker & Docker Compose

## Installation

### Using Docker

## Clone the repository:
git clone https://github.com/ArtursTorsters/country-encyclopedia.git
   cd countries


## Create a .env file by copying the example:
.env.example .env

## Update the database credentials in the .env file:
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

## Start the Docker containers:
docker-compose up -d

## Install Composer dependencies:
docker-compose exec app composer install

## Generate an application key:
docker-compose exec app php artisan key:generate

## Run the database migrations:
docker-compose exec app php artisan migrate

## Fetch country data
docker-compose exec app php artisan countries:fetch

## Access
open localhost:8000


Manual Installation (Without Docker)

## Clone the repository:
git clone https://github.com/ArtursTorsters/country-encyclopedia.git
cd countries

## Create a .env file by copying the example:
cp .env.example .env

## Update the database credentials in the .env file to match your local environment.
Install Composer dependencies:
composer install

## Install npm dependencies:
npm install

## Generate an application key:
php artisan key:generate

## Run the database migrations:
php artisan migrate

## Fetch country data from the API:
php artisan countries:fetch

## Start the development server:
php artisan serve

## In a separate terminal, start the Vite development server:
npm run dev

## Access
open localhost:8000
