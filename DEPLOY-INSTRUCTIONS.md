# URGENT DEPLOYMENT STEPS

## 1. MongoDB Atlas (DO THIS NOW)
1. https://cloud.mongodb.com/ → Sign up with Google
2. Create FREE cluster (M0 Sandbox)
3. Database Access → Add User: contactapp / contactapp123
4. Network Access → Allow 0.0.0.0/0
5. Connect → Get connection string

## 2. Render Deployment
1. https://render.com/ → Sign up with GitHub
2. New Web Service → Connect your repo
3. Settings:
   - Build: `npm install && cd client && npm install && npm run build`
   - Start: `node server.js`
   - Environment Variables:
     - NODE_ENV: production
     - MONGODB_URI: [your-atlas-connection-string]

## 3. Submit Form
- App URL: https://your-app-name.onrender.com
- GitHub: Your repo URL
- Form: https://forms.gle/7Kw7ngPdYRvVuKWh6

TIME IS CRITICAL - GO NOW! 🚀