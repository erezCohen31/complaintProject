# Complaint Management System

A web-based complaint management system built with Node.js, Express, and MongoDB. This application allows users to submit, track, and manage complaints efficiently.

## Features

- User authentication and authorization
- Submit new complaints
- Track complaint status
- Admin dashboard for complaint management
- Responsive web interface

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

## Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd complaintProject
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     PORT=3000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
complaintProject/
├── controllers/    # Route controllers
├── db/            # Database connection and models
├── models/        # Data models
├── public/        # Static files (CSS, JS, images)
├── routes/        # Route definitions
├── tests/         # Test files
├── .env           # Environment variables
├── server.js      # Main application file
└── package.json   # Project dependencies
```

## Available Scripts

- `npm start`: Start the application
- `npm run dev`: Start the development server with nodemon
- `npm test`: Run tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please open an issue in the repository.
