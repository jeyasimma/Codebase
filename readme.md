# Freelance Connect

Freelance Connect is a full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack. It allows users to register, log in, and view profiles of registered users. The app is designed to connect freelancers with potential clients, helping people collaborate based on their profiles and expertise.

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

2. **Install Dependencies**:

    ```bash
    cd frontend
    npm install

    cd backend
    npm install

3. **Create .env file**
   
   Environment Variables Create a .env file in the server folder with the following variables:

    ```plaintext
    PORT=5000
    MONGDB_URL='mongodb://localhost:27017/codebase'
    JWT_SECRET=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=

1. **Run the Application**

    ```bash
    cd frontend
    npm run dev


### Project Structure

    ```plaintext
    Codebase/
    ├── frontend/               # React frontend
    ├── backend/               # Express backend
    │   ├── models/           # Mongoose models
    │   ├── routes/           # Express routes
    │   ├── controllers/      # Controllers for handling business logic
    │   ├── middleware/       # Middleware for authentication, etc.
    |   |── .env.example          # Example of environment variables
    │   └── index.js         # Entry point of the server
    ├── README.md             # Project documentation
    ```


### API Endpoints

## API Endpoints

Here’s a list of key API endpoints available in the backend:

| Method | Endpoint              | Description                           |
|--------|------------------------|--------------------------------------|
| POST   | `/auth/register`          | Register a new user               |
| POST   | `/auth/login`             | Log in a user                     |
| POST   | `/auth/logout`            | Log out a user                    |
| GET    | `/dashboard/users`        | Get list of all registered users  |
| DELETE | `/dashboard/delete/:id`   | Get specific user profile         |
| GET    | `/public/Singleuser/:id`  | Get specific user profile         |

Here’s a list of key API endpoints available in the frontend:

| Method | Endpoint               | Description                          |
|--------|------------------------|--------------------------------------|
| GET    | `/`                    | List of all users (Home Page)        |
| GET    | `/user/:userId`        | Single user Profile                  |
| GET    | `/login`               | Log in a user                        |
| GET    | `/register`            | Register a new user                  |



### Contribution

We welcome contributions! Follow these steps to contribute to this project.

1. **Fork the Repository**  
   Create a fork of this repository by clicking the "Fork" button at the top of the repository page on GitHub.

2. **Clone Your Fork**  
   Clone the forked repository to your local machine:

   ```bash
   git clone https://github.com/AbhilashK26/Codebase.git
   cd Codebase

3. **Create a Branch**
    Create a new branch for your feature or bugfix:

    ```bash
    git checkout -b feature/YourFeatureName

4. **Make Your Changes**
    Write clean, readable, and well-documented code. Ensure that the code passes all tests and follows the project's coding standards. You can also attach a working video to demonstrate your changes.

5. **Commit and Push Your Changes**

    ```bash
    git add <file_name>
    git commit -m "Add YourFeatureName"
    git push origin feature/YourFeatureName
    
6. **Create a Pull Request**
    Go to the original repository on GitHub, click on the "Pull Request" tab, and submit your pull request. Include a detailed description of the changes you made and` why they should be merged.

7. **Reporting Issues**
    If you find a bug or want to suggest a feature:

    - Search Existing Issues: 
    Check if there is already an open issue for your query. Avoid duplicating issues if possible.

    - Open a New Issue: 
    If your issue is unique, open a new issue and describe it in detail. Include steps to reproduce, if applicable, and suggested improvements.

Thank you for contributing to Freelance Connect! Happy Coding!
