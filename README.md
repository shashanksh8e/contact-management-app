# Contact Management App

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing contacts.

## Features

- ✅ Add new contacts with name, email, phone, and address
- ✅ View all contacts in a responsive card layout
- ✅ Edit existing contacts
- ✅ Delete contacts with confirmation
- ✅ Search contacts by name, email, or phone
- ✅ Form validation and error handling
- ✅ Responsive design with Bootstrap
- ✅ Real-time search with debouncing

## Tech Stack

**Frontend:**
- React 18
- Bootstrap 5
- Axios for API calls
- Responsive design

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled
- RESTful API

## API Endpoints

- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create a new contact
- `GET /api/contacts/:id` - Get a specific contact
- `PUT /api/contacts/:id` - Update a contact
- `DELETE /api/contacts/:id` - Delete a contact

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd contact-management-app
   ```

2. **Install server dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Setup**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/contactmanager
   PORT=5000
   NODE_ENV=development
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your system.

6. **Run the application**
   ```bash
   # Run both server and client concurrently
   npm run dev
   
   # Or run separately:
   # Server only: npm run server
   # Client only: npm run client
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Deployment

### Heroku Deployment

1. **Create a Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-atlas-uri
   heroku config:set NODE_ENV=production
   ```

3. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get your connection string and update the `MONGODB_URI` environment variable

## Project Structure

```
contact-management-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
│   └── package.json
├── server.js              # Express server
├── package.json           # Server dependencies
├── .env                   # Environment variables
├── Procfile              # Heroku deployment
└── README.md
```

## Contact Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  address: String (optional),
  createdAt: Date (auto-generated)
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).