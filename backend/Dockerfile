FROM php:8.2-cli-alpine

# Install system dependencies and php extensions
RUN apk add --no-cache \
    openssl \
    zip \
    unzip \
    git \
    sqlite \
    sqlite-dev \
    libzip-dev

RUN docker-php-ext-install zip pdo pdo_sqlite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Copy env template to .env so Laravel has it
RUN cp .env.example .env

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

# Configure Laravel storage and cache directories
RUN mkdir -p bootstrap/cache storage/framework/sessions storage/framework/views storage/framework/cache/data storage/logs database
RUN touch database/database.sqlite
RUN chmod -R 777 storage bootstrap/cache database

# Generate key
RUN php artisan key:generate

# Expose port
EXPOSE 8000

# Run migrations and start server at runtime
CMD ["sh", "-c", "php artisan migrate --seed --force && php artisan serve --host=0.0.0.0 --port=8000"]
