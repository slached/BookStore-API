
# BookStore API

## Overview

The **BookStore API** is a RESTful API designed for managing books in a bookstore application. It provides endpoints for adding, removing, updating, and fetching book data, allowing users to perform CRUD operations with ease. This project demonstrates the use of modern web development practices and technologies for building a scalable and maintainable API.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete book records.
- **Data Validation**: Ensure valid data with middleware before making database changes.
- **Error Handling**: Handles common error scenarios with helpful error messages.
- **Search Functionality**: Search books by title, author, or genre.
- **No Authentication**: Currently, there is no authentication mechanism implemented in this API.
- **No Pagination**: The API does not currently support pagination for large datasets.

## Getting Started

Follow these steps to get the BookStore API up and running locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [PostgreSQL](https://www.postgresql.org/) (local or use a PostgreSQL cloud service)
- [Postman](https://www.postman.com/) (optional, for API testing)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/slached/BookStore-API.git
    cd BookStore-API
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file at the root of the project and add the following configurations:

    ```
    DATABASE_URL=your_postgresql_connection_string
    PORT=5000
    ```

4. Set up Sequelize:

    If you haven't already, initialize Sequelize and run migrations to set up your database schema:

    ```bash
    npx sequelize-cli db:migrate
    ```

5. Start the server:

    ```bash
    npm start
    ```

    The server will now be running on `http://localhost:5000`.



## Technologies Used

- **Node.js** for building the backend server
- **Express** for handling API routes and requests
- **PostgreSQL** for data storage
- **Sequelize** as the ORM for interacting with the PostgreSQL database
- **dotenv** for managing environment variables

## Contributing

Feel free to fork the repository, make changes, and submit a pull request. Contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
