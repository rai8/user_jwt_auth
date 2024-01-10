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
