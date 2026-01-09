# Contact Management App

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing contacts.

## Features

- ✅ Add, edit, and delete contacts
- ✅ Search contacts by name, email, or phone
- ✅ Responsive design
- ✅ Real-time form validation
- ✅ MongoDB data persistence
- ✅ RESTful API endpoints

## Tech Stack

- **Frontend**: React.js, Bootstrap, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: Heroku/Render

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   ```
3. Set up environment variables in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/contactmanager
   PORT=5000
   NODE_ENV=development
   ```
4. Run the application:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create a new contact
- `GET /api/contacts/:id` - Get a specific contact
- `PUT /api/contacts/:id` - Update a contact
- `DELETE /api/contacts/:id` - Delete a contact

## Deployment

The app is configured for deployment on Heroku with:
- Procfile for process management
- Production build script
- Environment variable configuration

## Live Demo

🚀 **Deployed Application**: [Contact Manager App](https://your-app-name.onrender.com)

## Repository

📁 **GitHub Repository**: [Contact Management App](https://github.com/yourusername/contact-management-app)