# Home Feed Module

A Node.js module for serving personalized home feeds with recommendations, ads, and user interactions.

## Features

- Personalized post recommendations based on user interactions and interests
- User recommendations
- Ad injection with targeting
- Real-time feed evolution
- Block list filtering
- Comprehensive test coverage

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration values.

3. Start the server:
   ```bash
   npm start
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| DB_URL | Database connection URL | mongodb://localhost:27017/homefeed |
| AD_SERVICE_URL | Ad service endpoint | http://localhost:4000 |
| JWT_SECRET | Secret key for JWT tokens | (required) |

## API Endpoints

- `GET /api/v1/feed?cursor=<token>&limit=<n>` - Get paginated feed
- `GET /api/v1/users/recommended` - Get recommended users

## Running Tests

Run all tests:
```bash
npm test
```

Run specific test suites:
```bash
npm run test:unit       # Unit tests
npm run test:integration # Integration tests
npm run test:e2e        # End-to-end tests
```

## Project Structure

- `api/` - HTTP routes and middleware
- `services/` - Business logic services
- `engine/` - Recommendation engine
- `models/` - Data schemas
- `config/` - Configuration and constants
- `utils/` - Helper functions
- `tests/` - Test suites and fixtures 