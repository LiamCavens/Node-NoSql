# Node - NoSql

Simple overview to learning node with mongodb

---

## Features

- List the key features of the application.
- Example:
  - Manage user accounts, carts, and orders.
  - View and update product details.
  - Use MongoDB as a NoSQL database.
  - Follow a layered architecture with TypeScript.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Language**: TypeScript
- **Tools**: Git, Nodemon, Jest (optional for testing)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LiamCavens/node-nosql.git
   cd node-nosql
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables:
    - Create a new file `.env` in the root directory.
    - Add these environment variables:
      ```env
      MONGO_URI=mongodb://localhost:27017/database-no-sql
      MONGO_URI_TEST=mongodb://localhost:27017/database-no-sql-test
      PORT=8000
      ```

4. Start MongoDB (locally or connect to your MongoDB Atlas instance).

5. build the project:
    ```bash
    npm run build
    ```

6. run the project:
    ```bash
    npm start
    ```
