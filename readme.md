# CodeBase

CodeBase is a full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack. It allows users to register, log in, and view profiles of registered users. The app is designed to connect freelancers with potential clients, helping people collaborate based on their profiles and expertise.

## Features

- **User Registration:** Create an account with a unique username, email, and password.
- **User Login:** Secure login with password hashing.
- **Profile Viewing:** Browse and view profiles of registered users to see their skills and expertise.

## Technology Stack

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose for data modeling)
- **Authentication:** JSON Web Tokens (JWT) and bcrypt for password hashing
  
## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js (v14 or later)
- MongoDB (Local instance or MongoDB Atlas)
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AbhilashK26/Codebase.git
   cd Codebase
   ```

2. **Install Dependencies**:

    ```bash
    cd frontend
    npm install

    cd backend
    npm install
    ```
    
3. **Create .env file**
   
   Environment Variables Create a .env file in the server folder with the following variables:

    ```plaintext
    PORT=5000
    MONGDB_URL='mongodb://localhost:27017/codebase'
    JWT_SECRET=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    ```

1. **Run the Application**
    
    For backend: Run the backend server inside backend directory
    ```bash
    cd backend
    npm run dev
    ```

    For frontend: Run the frontend server inside frontend directory
    ```bash
    cd frontend
    npm run dev
    ```

### Project Structure

    Codebase/
    ├── frontend/               # React frontend
    │    ├── src/
    │    │   ├── assets/
    │    │   ├── components/
    │    │   ├── layout/
    │    │   ├── pages/
    │    │   ├── redux/
    │    │   ├── services/
    │    │   ├── App.css
    │    │   ├── App.jsx
    │    │   ├── index.css
    │    │   └── main.jsx
    │    ├── index.html
    │    ├── package-lock.json
    │    └── package.json
    |
    ├── backend/               # Express backend
    │   ├── models/            # Mongoose models
    │   ├── routes/            # Express routes
    │   ├── controllers/       # Controllers for handling business logic
    │   ├── middleware/        # Middleware for authentication, etc.
    |   |── .env               # Example of environment variables
    │   |── index.js           # Entry point of the server
    │   ├── package-lock.json
    │   └── package.json
    └── README.md              # Project documentation
    

### API Endpoints

Here’s a list of key API endpoints available in the backend:

| Method | Endpoint              | Description                           |
|--------|------------------------|--------------------------------------|
| POST   | `/auth/register`          | Register a new user               |
| POST   | `/auth/login`             | Log in a user                     |
| POST   | `/auth/logout`            | Log out a user                    |
| GET    | `/dashboard/users`        | Get list of all registered users  |
| DELETE | `/dashboard/delete/:id`   | Get specific user profile         |
| GET    | `/public/Singleuser/:id`  | Get specific user profile         |
| GET    | `/user/filter`            | Get Filtered Users                |

Here’s a list of key API routes available in the **frontend**:

| Method | Endpoint               | Description                          |
|--------|------------------------|--------------------------------------|
| GET    | `/`                    | List of all users (Home Page)        |
| GET    | `/user/:userId`        | Single user Profile                  |
| GET    | `/login`               | Log in a user                        |
| GET    | `/register`            | Register a new user                  |
| GET    | `/filter`              | Get filtered users                   |

## Want to Contribute?

Please visit [CONTRIBUTING.md](CONTRIBUTING.md) and follow the contribution guidlines.

## License

This repository is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

