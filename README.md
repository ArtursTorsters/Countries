# Country Encyclopedia

## Technology Stack

- **Backend**: Laravel 10 (PHP 8.2)
- **Frontend**: React with Inertia.js
- **CSS Framework**: Tailwind CSS
- **Database**: MySQL 8.0
- **Containerization**: Docker & Docker Compose

## Docker Installation

### Prerequisites
- Docker
- Docker Compose

### Steps

1. Clone the repository:
   ```
   git clone https://github.com/ArtursTorsters/country-encyclopedia.git
   cd country-encyclopedia
   ```

2. Create .env file:
   ```
   cp .env.example .env
   ```

3. Update database credentials in the .env file:
   ```
   DB_CONNECTION=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_DATABASE=your_database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

4. Start Docker containers:
   ```
   docker-compose up -d
   ```

5. Install dependencies:
   ```
   docker-compose exec app composer install
   docker-compose exec app npm install
   ```

6. Generate application key:
   ```
   docker-compose exec app php artisan key:generate
   ```

7. Run database migrations:
   ```
   docker-compose exec app php artisan migrate
   ```

8. Fetch country data:
   ```
   docker-compose exec app php artisan countries:fetch
   ```

9. Access the application:
   Open `http://localhost:8000`

## Manual Installation

### Prerequisites
- PHP 8.2
- Composer
- Node.js
- MySQL

### Steps

1. Clone the repository:
   ```
   git clone https://github.com/ArtursTorsters/country-encyclopedia.git
   cd country-encyclopedia
   ```

2. Create .env file:
   ```
   cp .env.example .env
   ```

3. Install PHP dependencies:
   ```
   composer install
   ```

4. Install npm dependencies:
   ```
   npm install
   ```

5. Generate application key:
   ```
   php artisan key:generate
   ```

6. Run database migrations:
   ```
   php artisan migrate
   ```

7. Fetch country data:
   ```
   php artisan countries:fetch
   ```

8. Start development servers:
   ```
   # Laravel server
   php artisan serve

   # Vite (in a separate terminal)
   npm run dev
   ```

9. Access the application:
   Open `http://localhost:8000`

## Contributing

Contributions are welcome.

## License

[Add your license information]
