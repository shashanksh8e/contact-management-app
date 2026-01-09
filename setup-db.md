# Quick MongoDB Atlas Setup

1. Go to https://cloud.mongodb.com/
2. Sign up/Login
3. Create FREE cluster
4. Database Access -> Add User: 
   - Username: contactapp
   - Password: contactapp123
5. Network Access -> Add IP: 0.0.0.0/0 (Allow all)
6. Connect -> Connect your application
7. Copy connection string and replace in Render environment variables

Connection String:
mongodb+srv://contactuser:Ih0h6EdYf90k3nhi@cluster0.uxv2wxy.mongodb.net/contactmanager?retryWrites=true&w=majority&appName=Cluster0