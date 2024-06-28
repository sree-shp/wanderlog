# WanderLog - Travel Tracking Application

WanderLog is a travel tracking application that allows users to mark and save their travel locations on an interactive map. It features secure user authentication and authorization using JWT, ensuring data privacy and security. The application is fully responsive, providing a seamless experience across devices.

## Features

- **Interactive Map**: Click on the map to save travel locations with city, date, and optional notes.
- **Location Management**: View all saved locations and filter them by city or country.
- **Authentication**: Secure user authentication and authorization using JWT tokens.
- **Responsive Design**: Fully responsive layout for optimal viewing on various devices.

## Prerequisites

- Node.js (v12 or later)
- npm (v6 or later)
- MongoDB (MongoDB Atlas)

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/sree-shp/wanderlog.git
cd Fash
```

### Install Dependencies

Navigate to the "client" directory and install dependencies:

```sh
cd client
npm install
```

Navigate to the "server" directory and install dependencies:

```sh
cd ../server
npm install
```

### Setup Environment Variables

Create a .env file in the server directory and add the following variables:

```sh
PORT=4000
DATABASE_URL=mongodb://<username>:<password>@cluster0.mongodb.net/wanderlog?retryWrites=true&w=majority
```

Replace <username> and <password> with your actual MongoDB credentials. For local development, you can use:

Create a .env file in the client directory and add the following variables:

```sh
VITE_REACT_APP_API_BASEURL=http://localhost:4000
```

### Run the Application

**Client**
Start the client development server:

```sh
cd client
npm start
```

The frontend server should now be running on http://localhost:5173.

**Server**
Start the backend server

```sh
cd ../server
npm start
```

The backend server should now be running on http://localhost:4000.

## Usage

1. Open your browser and navigate to http://localhost:5173.
2. Browse products through search, categories, subcategories, and sales.
3. View detailed information about a product and choose size and quantity.
4. Add products to the cart and review details in the cart page.
5. Place an order and track order details through the navbar.

## API Endpoints

### User Authentication and Authorization

1. GET /api/v2/user/signup - Signup new user
2. POST /api/v2/user/login - Login a user

### City Management

1. GET /api/v2/city - List all cities
2. POST /api/v2/city - Add a city
3. GET /api/v2/city/:id - Get Details of a city based on id
4. PATCH /api/v2/city/:id - Update city details based on id
5. DELETE /api/v2/city/:id - Delete a city based on id
