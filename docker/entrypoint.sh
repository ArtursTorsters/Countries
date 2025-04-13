#!/bin/bash
set -e


# Wait for MySQL to be ready
while ! nc -z host.docker.internal 3306; do
  echo "Waiting for MySQL database to be ready..."
  sleep 5
done

# Install dependencies
composer install
npm install

# Build frontend assets
npm run build

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Fetch countries
php artisan countries:fetch

# Additional debugging
echo "Apache configuration:"
cat /etc/apache2/sites-available/000-default.conf

# Start Apache in the foreground
apache2-foreground
