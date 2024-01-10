# USER AUTHENTICATION AND AUTHORIZATION

user authentication and authorization system using Node.js, Express.js, and Sequelize. Utilize JWT for token-based authentication,

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Run the Application](#run-the-application)
- [API Documentation](#api-documentation)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version >= 16)
- npm (Node Package Manager) / Yarn installed
- nodemon installed for dev environment
- PostgreSQL installed and running (version >= 15.3)

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/rai8/user_jwt_auth.git
   cd your-project
   npm install
```

## Configuration

1. Create a .env file in the project root and configure the following variables:

```bash
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   JWT_SECRET=your_jwt_secret
   SESSION_SECRET=your_session_secret
```

## Database Setup

1. Create the PostgreSQL database:

```bash
  CREATE DATABASE your_database_name ;
```

2. Run scripts

```bash
  CREATE DATABASE your_database_name ;
  \c your_database_name ;
  CREATE TABLE IF NOT EXISTS "Role" (
    "roleId"  SERIAL ,
    "roleName" VARCHAR(100) NOT NULL,
    "isArchived" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY ("roleId")
    );
  CREATE TABLE IF NOT EXISTS "User" (
    "userId"  SERIAL ,
    "firstName" VARCHAR(100),
    "lastName" VARCHAR(100),
    "roleId" INTEGER REFERENCES "Role" ("roleId") ON DELETE NO ACTION ON UPDATE CASCADE,
    "email" VARCHAR(50),
    "password" VARCHAR(225),
    "isArchived" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY ("userId")
    );

  INSERT INTO "Role" ("roleId","roleName","isArchived") VALUES (1,'Admin',false);
  INSERT INTO "Role" ("roleId","roleName","isArchived") VALUES (2,'User',false);

  INSERT INTO "User" ("userId","firstName", "lastName", "roleId","email", "password", "isArchived")
  VALUES (DEFAULT, 'Admin', 'User', 1, 'admin@gmail.com','$2a$10$LkJFootOsEzpPnPtyvuku7BaxF0gMLr1/CohhVZH81x3PX9QdSeq', false );
```

## Run the Application

1. Start the application:

```bash
  npm start
```

The application will be accessible at http://localhost:8082 by default.

## API Documentation

API documentation is generated using Swagger. Visit http://localhost:8082/api/swagger/v1/ to explore and test the APIs.

1. Login credentials for default admin user

```bash
  email: admin@gmail.com
  password: admin123
```
