# User Management API (Backend)

This is the **backend API** for the User Management application. It provides authentication (JWT), user CRUD operations, role and permission management, and is designed to be used with a React frontend and a MongoDB database.

---

## Summary

- [Production URLs](#production-urls)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables (.env.template)](#environment-variables-envtemplate)
- [Running with Docker Compose](#running-with-docker-compose)
- [API Documentation (Swagger)](#api-documentation-swagger)
- [Testing](#testing)
- [Technologies Used](#technologies-used)

---

## Production URLs

- **API Production URL**: [https://ci-cd-back-dbsx.onrender.com](https://ci-cd-back-dbsx.onrender.com)
- **Frontend Client (Production)**: [https://jamil18474.github.io/ci-cd-react/](https://jamil18474.github.io/ci-cd-react/)

---

## Features

- User registration & authentication (JWT)
- Secure password hashing (bcrypt)
- Role-based access control (admin & user)
- REST API for managing users
- MongoDB database integration
- Environment-based configuration
- Secure by default (Helmet, CORS, rate-limiting)
- Ready for deployment (Docker, CI/CD)
- **Interactive API documentation with Swagger**

---

## Prerequisites

- **Node.js**
- **npm**
- **MongoDB** (Docker)
- **Docker** and **Docker Compose** (recommended for local development)

---

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/Jamil18474/ci-cd-back.git
cd ci-cd-back
```

2. **Install dependencies**

```bash
cd backend
npm install
```

---

## Environment Variables (.env.template)

All sensitive or environment-specific values are managed through `.env.template` files.

> **⚠️ You MUST copy the `.env.template` file to `.env` in THREE locations:**
>  - At the project **root**
>  - In the `/backend` folder
>  - In the `/database` folder
>
> Each `.env` file is used by a different part of the stack (Docker Compose, backend Node.js, MongoDB init scripts).
>
> **Never commit your real `.env` files to version control.**

**How to set up:**

```bash
# At project root 
cp .env.template .env

# In backend folder
cd backend
cp .env.template .env

# In database folder
cd database
cp .env.template .env

```

**Main variables to set:**
- MongoDB credentials and URI
- JWT secret(s)
- Admin/user emails and password hashes
- Frontend URL for CORS

See detailed comments in each `.env.template` for what you need to fill.

---

## Running with Docker Compose

The recommended way to run the backend (with MongoDB) is via Docker Compose.

1. **Start the services**

From the project root directory (where `docker-compose.yml` is located):

```bash
docker-compose -f docker-compose.yml up --build -d
```

- This will start:
  - MongoDB (`mongodb`)
  - Backend API server (`backend`)


2. **API will be available at**: [http://localhost:8000](http://localhost:8000)

---

### Stopping and Removing Docker Containers and Volumes

To **stop and remove all containers and also delete the database volumes** (resetting your data), from the project root directory (where `docker-compose.yml` is located), use:

```bash
docker-compose -f docker-compose.yml down -v
```

> This is useful if you want to re-seed your database and ensure all initialization scripts (users, etc.) are re-applied from scratch.

---

## API Documentation (Swagger)

The API is documented and testable in your browser using **Swagger UI**.

- **Access the Swagger UI:**  
  [http://localhost:8000/api-docs](http://localhost:8000/api-docs) (when running locally with Docker Compose or `npm run dev`)
  or in production : [https://ci-cd-back-dbsx.onrender.com/api-docs](https://ci-cd-back-dbsx.onrender.com/api-docs/)
- Here you can view all endpoints, see required/requested data, and try out requests directly in the browser.
- **Tip:** Secure endpoints require JWT authentication. Use the `/api/auth/login` route to obtain a token, then use the "Authorize" button in Swagger UI to authenticate your requests.
- **To log out in Swagger UI:** Click on the "Authorize" button (top right), then click the "Logout" button in the modal window. This will remove your JWT from Swagger and de-authenticate your session.

---

## Default Seeded Users for Local Testing

> **After launching Docker and having all your `.env` files in place,** you can immediately test the API with the following users already created in your local database:

- **Admin user**
  - **Email:** `marie.dubois@company.local`
  - **Password:** `AdminLocalSecure2025!`

- **Regular user**
  - **Email:** `lucas.martin@company.local`
  - **Password:** `UserLocalSecure2025!`

### Production

> **For the production**, these users are already seeded and ready to use for testing:

- **Admin user**
  - **Email:** `pierre.leblanc@company.local`
  - **Password:** `AdminProdSecure2025!`

- **Regular user**
  - **Email:** `clara.bernard@company.local`
  - **Password:** `UserProdSecure2025!`

You can use these credentials to log in via Swagger UI, Postman, or your frontend.

---

## Testing

- Tests are written with **Jest**.
- To run all tests:

```bash
cd backend
npm run test
```

---

## Technologies Used

- **Node.js** / **Express.js**
- **MongoDB** / **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **Helmet**, **CORS** for security
- **Jest** for testing
- **Docker** / **Docker Compose** for containerization
- **Swagger UI** for API documentation
