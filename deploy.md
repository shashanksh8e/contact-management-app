# Deployment Guide

## Quick Deployment Steps

### 1. MongoDB Atlas Setup (Free)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create new cluster (free tier)
4. Create database user
5. Add IP address (0.0.0.0/0 for all)
6. Get connection string

### 2. Heroku Deployment
```bash
# Install Heroku CLI first
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-contact-app-name

# Set environment variables
heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
heroku config:set NODE_ENV=production

# Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

### 3. Alternative: Render.com (Free)
1. Connect GitHub repo to Render
2. Create Web Service
3. Set build command: `npm install && cd client && npm install && npm run build`
4. Set start command: `node server.js`
5. Add environment variable: `MONGODB_URI`

### 4. Alternative: Railway (Free)
1. Connect GitHub to Railway
2. Deploy from repo
3. Add MongoDB Atlas connection string
4. Auto-deploys on git push

## Environment Variables Needed:
- `MONGODB_URI`: Your MongoDB connection string
- `NODE_ENV`: production
- `PORT`: (auto-set by hosting platforms)

## Testing Locally:
```bash
# Start MongoDB locally or use Atlas
npm run dev
# Visit http://localhost:3000
```