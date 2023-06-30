## Dishub

Dishub is a hub for open discussions, providing a platform for users to engage in meaningful conversations and share their thoughts, ideas, and opinions on various topics. It aims to foster a vibrant community where users can connect, learn, and exchange insights with one another.
The application allows users to create posts on different subjects and engage in discussions by commenting on existing posts. Users can browse through a wide range of topics, explore trending posts, and interact with other users through comments. Dishub encourages a respectful and inclusive environment, promoting healthy dialogue and diverse perspectives.
Built with Node.js and Express.js, Dishub utilizes a MongoDB database with the help of Mongoose for efficient data management. User authentication and authorization are implemented using bcryptjs for password hashing and JWT for secure access control. The application follows industry-standard security practices such as rate limiting, data sanitization, and protection against common vulnerabilities like NoSQL query injection and cross-site scripting (XSS) attacks.


## Table of Contents

- [Introduction](#introduction)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Dependencies](#dependencies)
- [Contributing](#contributing)



### Installation

1. Clone the repository:

   ```shell
   git clone <repository_url>
   ```

2. Install the dependencies:

   ```shell
   npm install
   ```

### Configuration

1. Create a `.env` file in the project root directory.
2. Add the following environment variables in the `.env` file:

   ```plaintext
   DATABASE=<your_database_connection_string>
   PASSWORD=<your_database_password>
   JWT_SECRET_KEY=<your_jwt_secret_key>
   JWT_EXPIRES_IN=<your_jwt_expiration_day>
   JWT_COOKIE_EXPIRES_IN=<your_jwt_cookie_expiration_day>

   ```
### Usage

1. Start the server:

   ```shell
   nodemon server.s
   ```

2. Access the application through the following URL:

   ```plaintext
   http://localhost:8080
   ```

## API Routes

### Posts

- `GET /api/v1/dishub/posts`: Get all posts.
- `POST /api/v1/dishub/posts`: Create a new post.
- `GET /api/v1/dishub/posts/:id`: Get a specific post.
- `PATCH /api/v1/dishub/posts/:id`: Update a specific post.
- `DELETE /api/v1/dishub/posts/:id`: Delete a specific post.
- `GET /api/v1/dishub/posts/getTrendingPosts`: Get trending posts.

### Comments

- `POST /api/v1/dishub/posts/:postId/comments`: Create a new comment for a specific post.
- `GET /api/v1/dishub/posts/:postId/comments`: Get all comments for a specific post.
- `GET /api/v1/dishub/posts/:postId/comments/:id`: Get a specific comment for a specific post.
- `PATCH /api/v1/dishub/posts/:postId/comments/:id`: Update a specific comment for a specific post.
- `DELETE /api/v1/dishub/posts/:postId/comments/:id`: Delete a specific comment for a specific post.

### Creators

- `POST /api/v1/dishub/creators/signup`: Signup as a creator.
- `POST /api/v1/dishub/creators/login`: Login as a creator.
- `GET /api/v1/dishub/creators/me`: Get the currently logged-in creator.
- `PATCH /api/v1/dishub/creators/updateMe`: Update the profile of the currently logged-in creator.
- `DELETE /api/v1/dishub/creators/deleteMe`: Delete the profile of the currently logged-in creator.
- `PATCH /api/v1/dishub/creators/updatePassword`: Update the password of the currently logged-in creator.
- `GET /api/v1/dishub/creators/logout`: Logout the currently logged-in creator.
- `GET /api/v1/dishub/creators`: Get all creators (restricted to admin only).
- `POST /api/v1/dishub/creators`: Create a new creator (restricted to admin only).
- `GET /api/v1/dishub/creators/:id`: Get a specific creator (restricted to admin only).
- `PATCH /api/v1/dishub/creators/:id`: Update a specific creator (restricted to admin only).
- `DELETE /api/v1/dishub/creators/:id`: Delete a specific creator (restricted to admin only).

### Dependencies

- express: "^4.18.2"
- express-mongo-sanitize: "1.3"
- express-rate-limit: "3.5"
- helmet: "3.16"
- hpp: "^0.2.3"
- mongoose: "^5.13.17"
- bcryptjs: "^2.4.3"
- jsonwebtoken: "^9.0.0"
- dotenv: "^16.0.3"
- nodemon: "^2.0.22"
- validator: "^13.9.0"
- xss-clean: "^0.1.1"

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvement, please create a new issue or submit a pull request.

