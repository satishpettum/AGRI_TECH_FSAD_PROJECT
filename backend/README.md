# AgriConnect Backend

This folder contains the Spring Boot backend for the AgriConnect website.

## Requirements

- Java 17+
- Maven
- MySQL database

## Setup

1. Create a MySQL database named `agriconnect`.
2. Update `backend/src/main/resources/application.properties` with your MySQL credentials.
3. Run the backend:

```sh
cd backend
mvn spring-boot:run
```

The backend runs on `http://localhost:8080`.

## API Endpoints

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/public/resources`
- `GET /api/public/experts`
- `GET /api/public/community`
