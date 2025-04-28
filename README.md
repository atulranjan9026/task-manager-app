# Task Manager Application

A full-stack task management application built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- Task management (CRUD operations)
- Task filtering (All/Active/Completed)
- Priority levels (Low/Medium/High)
- Responsive design with Tailwind CSS
- JWT authentication
- MongoDB database integration

## Technical Stack

### Frontend
- React 18
- React Router v6
- Axios for API calls
- Tailwind CSS for styling
- Context API for state management
- PropTypes for type checking

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Database Schema

### User Model
```javascript
{
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  timestamps: true
}
```

### Task Model
```javascript
{
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['incomplete', 'complete'],
    default: 'incomplete'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timestamps: true
}
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd task-manager-app/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd task-manager-app/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Deployment

### GitHub Deployment
1. Create a new repository on GitHub
2. Initialize Git in your project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Link to GitHub repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/task-manager-app.git
   git branch -M main
   git push -u origin main
   ```

### Environment Variables
- Copy `.env.example` to `.env` in the server directory
- Update the variables with your actual values
- Never commit `.env` files to version control

### Database Setup
1. Set up MongoDB (local or Atlas)
2. Update `MONGODB_URI` in `.env` with your connection string
3. Run the seed script to populate the database:
   ```bash
   cd server
   npm run seed
   ```

## Seed Data

### Test Users
1. User 1:
   - Email: test1@example.com
   - Password: password123

2. User 2:
   - Email: test2@example.com
   - Password: password123

### Sample Tasks
Each test user has the following tasks:
1. High Priority Task
   - Title: "Complete Project Documentation"
   - Description: "Write comprehensive documentation for the project"
   - Priority: High
   - Status: Incomplete

2. Medium Priority Task
   - Title: "Code Review"
   - Description: "Review team members' code submissions"
   - Priority: Medium
   - Status: Complete

3. Low Priority Task
   - Title: "Update README"
   - Description: "Update project README with latest changes"
   - Priority: Low
   - Status: Incomplete

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Tasks
- GET `/api/tasks` - Get all tasks for authenticated user
- POST `/api/tasks` - Create a new task
- PUT `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task

## Architecture

The application follows a client-server architecture:

1. **Frontend (React)**
   - Uses functional components with hooks
   - Context API for state management
   - Protected routes with authentication
   - Responsive design with Tailwind CSS

2. **Backend (Node.js/Express)**
   - RESTful API design
   - JWT authentication middleware
   - MongoDB with Mongoose ODM
   - Error handling middleware

3. **Database (MongoDB)**
   - NoSQL database
   - Document-based storage
   - Indexed fields for better performance
   - Timestamps for tracking creation/updates

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- Input validation
- CORS configuration
- Environment variables for sensitive data

## Error Handling

- Global error handling middleware
- Proper HTTP status codes
- Descriptive error messages
- Client-side error display
- API error handling with Axios

## Future Improvements

- Add task categories
- Implement task search
- Add task due dates
- Implement task sharing
- Add user profile management
- Implement task comments
- Add task attachments
- Implement task reminders 