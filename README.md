# Website Pelatihan API Documentation

Website Pelatihan is a backend API developed for a training and certification platform.

## Overview

This API provides authentication and user management functionalities using JSON Web Token (JWT) for secure access.

---

## Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/AxelSeanCP/Website-Pelatihan.git
cd Website-Pelatihan
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Database

- Create a new MySQL database as per the `config/config.json` file.
- Run database migrations:

```bash
npx sequelize-cli db:migrate
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
PORT=<your-port>
HOST=<your-host>
BCRYPT_ROUNDS=<your-salt-rounds>

ACCESS_TOKEN_KEY=<your-access-token-key>
REFRESH_TOKEN_KEY=<your-refresh-token-key>
```

### 5. Start the Server

For development mode:

```bash
npm run start:dev
```

For production mode:

```bash
npm start
```

---

## API Endpoints

### **1. Users**

#### **Create a New User**

**Endpoint:** `POST /api/users`

**Request Body:**

```json
{
  "name": "Axel Sean CP",
  "username": "Axel",
  "email": "axel@gmail.com",
  "password": "axel1234"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "User created",
  "data": {
    "userId": "user-1234"
  }
}
```

#### **Get a User**

**Endpoint:** `GET /api/users/:id`

**Response:**

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "user-1234",
      "name": "Axel Sean CP",
      "username": "Axel",
      "email": "axel@gmail.com"
    }
  }
}
```

---

### **2. Authentications**

#### **Login**

**Endpoint:** `POST /api/authentications`

**Request Body:**

```json
{
  "username": "Axel",
  "password": "axel1234"
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "accessToken": "access-token",
    "refreshToken": "refresh-token"
  }
}
```

#### **Refresh token**

**Endpoint:** `PUT /api/authentications`

**Request Body:**

```json
{
  "refreshToken": "refresh-token"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Access token has been refreshed",
  "data": {
    "accessToken": "access-token"
  }
}
```

#### **Logout**

**Endpoint:** `DELETE /api/authentications`

**Request Body:**

```json
{
  "refreshToken": "refresh-token"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Refresh token deleted"
}
```

---

### **3. Enrollments**

> This endpoint requires an **Access Token** in the request headers.

**Headers:**

```json
{
  "Authorization": "Bearer <your-access-token>"
}
```

#### **Add Enrollment**

**Endpoint:** `POST /api/enrollments`

**Request Body:**

```json
{
  "courseId": "course-12345"
}
// input courseId from wordpress
```

**Response:**

```json
{
  "status": "success",
  "message": "User enrolled"
}
```

#### **Get Enrollments**

> returns enrollments from current user

**Endpoint:** `GET /api/enrollments`

**Response:**

```json
{
  "status": "success",
  "data": {
    [
      "id": "enrollment-1234",
      "userId": "user-1234",
      "courseId": "course-1234",
    ]
  }
}
```

#### **Delete Enrollment**

> returns enrollments from current user

**Endpoint:** `DELETE /api/enrollments`

**Request Body:**

```json
{
  "courseId": "course-1234"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Enrollments deleted"
}
```

---

### **4. Certificates**

#### **Create Certificate**

**Endpoint:** `POST /api/certificates`

**Request Body:**

```json
{
  "userId": "user-1234",
  "courseId": "course-1234",
  "courseName": "Learn JavaScript"
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "certificates": {
      "id": "certificateId",
      "userId": "user-1234",
      "courseId": "course-1234",
      "courseName": "Learn JavaScript",
      "pdfUrl": "/certificates/{certificateId}.pdf"
    }
  }
}
```

#### **Get All Certificates**

**Endpoint:** `GET /api/certificates`

**Response:**

```json
{
  "status": "success",
  "data": {
    "certificates": [
      {
        "id": "certificateId",
        "userId": "user-1234",
        "courseId": "course-1234",
        "courseName": "Learn JavaScript",
        "pdfUrl": "/certificates/{certificateId}.pdf",
        "user": {
          "name": "Axel Sean CP"
        }
      },
      ...
    ]
  }
}
```

#### **Verify Certificate**

**Endpoint:** `GET /api/certificates/{certificateId}/verify`

**Response:**

```json
{
  "status": "success",
  "data": {
    "certificates": {
      "id": "certificateId",
      "userId": "user-1234",
      "courseId": "course-1234",
      "courseName": "Learn JavaScript",
      "pdfUrl": "/certificates/{certificateId}.pdf",
      "user": {
        "name": "Axel Sean CP"
      }
    }
  }
}
```

#### **Delete Certificate**

**Endpoint:** `DELETE /api/certificates/{certificateId}`

**Response:**

```json
{
  "status": "success",
  "message": "Certificate deleted"
}
```

### Notes:

- Ensure you provide a valid JWT token for protected routes.
- The API follows RESTful conventions.
- Database migrations must be run before using the API.

For further details, check the [GitHub Repository](https://github.com/AxelSeanCP/Website-Pelatihan).
