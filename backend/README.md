# Harito Backend

This folder contains the backend code for the Harito application.

## Technologies
- **Node.js**: JavaScript runtime environment.
- **Express**: Fast, unopinionated, minimalist web framework.
- **Mongoose**: MongoDB object modeling tool.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing.
- **Dotenv**: For environment variable management.
- **Morgan**: HTTP request logger middleware.
- **Helmet**: Middleware to secure Express apps by setting various HTTP headers.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### Installation
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the application
3. Start the development server:
   ```bash
   npm run dev
   ```

### API Endpoints
- **GET /**: Welcome message.
- **GET /api/status**: Check API status.

## Directory Structure
- `src/index.js`: Main entry point.
- `src/config/`: Database and environment configuration.
- `src/controllers/`: Route handlers and business logic.
- `src/models/`: Database schemas and models.
- `src/routes/`: API route definitions.
- `src/middlewares/`: Express middleware functions.
- `src/utils/`: Utility functions and helpers.
