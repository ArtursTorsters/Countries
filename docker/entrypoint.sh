#!/bin/bash
set -e

# Install dependencies
composer install
npm install

# Wait for MySQL to be ready
until nc -z -v -w30 mysql 3306
do
  echo "Waiting for database connection..."
  sleep 5
done

# Run migrations and seed the database
php artisan migrate --force
php artisan countries:fetch

# Start npm in the background
npm run dev &

# Start Apache in the foreground
apache2-foreground
