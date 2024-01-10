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
- nodemon installed
- PostgreSQL installed and running

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
```
