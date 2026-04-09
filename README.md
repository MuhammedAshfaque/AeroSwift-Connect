# BookMyFlight

A full-stack web application for booking flights. This project features a robust backend for managing flight data and bookings, and an interactive frontend for users to search for and book flights.

## Tech Stacks

### Backend
- **Framework**: Spring Boot 
- **Language**: Java 21
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA
- **Build Tool**: Gradle

### Frontend
- **Framework**: React 
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Language**: JavaScript

---

## Project Structure
```text
BookMyFlight/
├── backend/          # Spring Boot backend application
├── frontend/         # React/Vite frontend application
└── README.md         # Project documentation
```

---

## Prerequisites
Ensure you have the following installed before running the project:
*   [Java Development Kit (JDK) 21](https://jdk.java.net/21/)
*   [Node.js](https://nodejs.org/) (which comes with `npm`)
*   [PostgreSQL](https://www.postgresql.org/)

---

## How to Run the Project

### 1. Database Setup (PostgreSQL)

1. Open your PostgreSQL server (using pgAdmin or psql CLI).
2. Create a new database for the application (e.g., `bookmyflight`).
3. Update the database credentials in the backend's `application.properties` or `application.yml` file, located in `backend/src/main/resources/`. 

Example configuration:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/bookmyflight
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### 2. Running the Backend (Spring Boot)

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Build and run the backend using Gradle wrapper:
   ```bash
   # On Windows
   .\gradlew.bat bootRun

   # On macOS/Linux
   ./gradlew bootRun
   ```
3. The backend server should start on `http://localhost:8080` (or whichever port is defined in your properties).

### 3. Running the Frontend (React + Vite)

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The frontend server will start typically on `http://localhost:5173`. Open this URL in your browser to interact with the application.

---

## Features
* **Full-Stack Integration**: Seamless communication between a React frontend and Spring Boot backend.
* **Modern Tooling**: Leverages Vite for fast frontend builds and Gradle for reliable backend dependency management.
* **Database persistence**: Uses PostgreSQL with Spring Data JPA for persistent storage and schema generation.
