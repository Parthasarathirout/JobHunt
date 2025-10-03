# 🚀 Backend API Deployment - Render.com

## Backend-Only Deployment

Since your frontend is already deployed elsewhere, here's the configuration for deploying just the backend API:

**Render Settings:**
- **Repository:** `https://github.com/Parthasarathirout/JobHunt.git`
- **Build Command:** `npm run build`  
- **Start Command:** `npm start`
- **Auto Deploy:** Yes
- **Service Type:** Web Service
- **Node Version:** 18.x or higher

## Frontend Integration

Since your frontend is already deployed, make sure to update your frontend's API base URL to point to your new Render backend:

```javascript
// In your frontend constants or config
const API_BASE_URL = 'https://your-backend-name.onrender.com';
```

## CORS Configuration

You may need to update your backend's CORS settings to allow requests from your frontend domain:

```javascript
// In backend/index.js
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:5173'],
  credentials: true
}));
```

## Why This Setup?

✅ **Backend Only**: Focus on API deployment since frontend is handled elsewhere  
✅ **MongoDB Atlas**: Uses your existing database  
✅ **Cloudinary**: Uses your existing file storage  
✅ **Simple**: Clean separation of concerns  
✅ **Free Tier**: Efficient use of Render's free plan  

**Environment Variables (Add these in Render dashboard):**
```
NODE_ENV=production
MONGO_URI=<your-mongodb-atlas-connection-string>
SECRET_KEY=<your-jwt-secret-key>
CLOUD_NAME=<your-cloudinary-cloud-name>
API_KEY=<your-cloudinary-api-key>
API_SECRET=<your-cloudinary-api-secret>
PORT=10000
```

## Deploy Steps

1. Go to [Render.com](https://render.com)
2. Connect your GitHub repo: `Parthasarathirout/JobHunt`
3. Choose "Web Service"
4. **IMPORTANT**: Set these commands exactly:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. Add environment variables from your local `.env` file
6. Deploy! 🚀

## Troubleshooting

**If you see "Cannot find package 'express'" error:**
- Make sure Build Command is set to `npm run build` (not `cd backend && npm install`)
- Make sure Start Command is set to `npm start` (not `npm run dev`)
- The root package.json handles the backend directory navigation

## Security Notes

⚠️ **IMPORTANT**: Never commit real environment variables to your repository!
- Use the `.env.example` template file
- Add actual values only in Render's environment variables dashboard
- Keep your `.env` file in `.gitignore`

## After Deployment

- Your API will be available at: `https://your-service-name.onrender.com`
- Update your frontend to use this URL  
- Test API endpoints to ensure everything works
- Rotate any exposed credentials if needed