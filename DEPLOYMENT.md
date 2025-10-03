# 🚀 Deployment Guide - Render.com

## Quick Setup (Recommended)

Since you're already using **MongoDB Atlas** and **Cloudinary**, here's the simplest deployment approach:

### Option 1: Backend-Only Deployment (Easiest)

Deploy just the backend API and serve frontend from there:

**Render Settings:**
- **Repository:** `https://github.com/Parthasarathirout/JobHunt.git`
- **Build Command:** `cd backend ; npm install`  
- **Start Command:** `cd backend ; npm start`
- **Auto Deploy:** Yes

### Option 2: Separate Frontend & Backend

**Backend Service:**
- Build: `cd backend ; npm install`
- Start: `cd backend ; npm start`
- Add same environment variables as above

**Frontend Service (Static Site):**
- Build: `cd frontend ; npm install ; npm run build`
- Publish: `frontend/dist`
- Environment: `VITE_API_URL=https://your-backend-url.onrender.com`

## Why This Setup?

✅ **MongoDB Atlas**: You're already using it - no need for Render's database  
✅ **Cloudinary**: You're already configured - no additional setup needed  
✅ **Simple**: Just point Render to your existing services  
✅ **Free Tier**: Works perfectly with Render's free plan  

## Current Error Fix

The error you saw happens because Render expected a `package.json` in the root. Now you have:
- ✅ Root `package.json` with proper scripts
- ✅ Backend `package.json` with `npm start` script  
- ✅ Existing MongoDB Atlas & Cloudinary setup

## Deploy Now

1. Go to [Render.com](https://render.com)
2. Connect your GitHub repo: `Parthasarathirout/JobHunt`
3. Choose "Web Service"
4. Use the settings above
5. Deploy! 🚀