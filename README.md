# Student Management API

A simple, lightweight RESTful API built with **Node.js**, **Express**, and **Mongoose (MongoDB)** to perform standard CRUD (Create, Read, Update, Delete) operations on a student database.

---

## Features

- **Create**: Add a new student with automated validation.
- **Read All**: Retrieve a list of all registered students.
- **Read One**: Retrieve details of a specific student by their unique ID.
- **Update**: Modify existing student records with strict validation checks.
- **Delete**: Remove a student record from the database.

---

## Prerequisites

Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Running locally on `mongodb://localhost:27017/`)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/ChAbdulWahhab/Node-Curd-API.git
cd Node-Crud-API

```

### 2. Install Dependencies

Initialize the node modules required for this project:

```bash
npm install

```

### 3. Start the Server

Make sure your local MongoDB instance is up and running, then execute:

```bash
node server.js

```

*Alternatively, if you have `nodemon` installed globally:*

```bash
nodemon server.js

```

The console should output:

```text
MongoDB is connected.
Server is running on http://localhost:3000

```

---

## API Endpoints

### 1. Students Schema Structure

Every student entry requires the following fields:

* `name` (String, Required)
* `age` (Number, Required)
* `course` (String, Required)
* `isEnrolled` (Boolean, Default: `true`)

### 2. Endpoint Reference

| Method | Endpoint | Description | Request Body (JSON) |
| --- | --- | --- | --- |
| **POST** | `/api/students` | Create a new student | `{ "name": "John Doe", "age": 21, "course": "Computer Science" }` |
| **GET** | `/api/students` | Get all students | *None* |
| **GET** | `/api/student/:id` | Get a student by ID | *None* |
| **PUT** | `/api/students/:id` | Update a student by ID | `{ "course": "Data Science", "isEnrolled": false }` |
| **DELETE** | `/api/students/:id` | Delete a student by ID | *None* |

---

## Error Handling

The API returns standard HTTP status codes:

* `200 OK`: Request succeeded.
* `201 Created`: Entry successfully created.
* `400 Bad Request`: Missing required parameters or data validation failed.
* `404 Not Found`: Student entry with the provided ID does not exist.
* `500 Internal Server Error`: Server or structural database formatting errors.