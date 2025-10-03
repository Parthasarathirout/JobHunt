# 🎨 JobHunt Frontend

A modern, responsive frontend for the JobHunt job portal platform, built with React 18, Vite, and Tailwind CSS. Features beautiful animations, intuitive UI/UX, and comprehensive job search functionality.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🎯 User Interface
- **Modern Design** - Beautiful gradient-based UI with purple-blue theme
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Framer Motion powered transitions and effects
- **Interactive Components** - Hover effects, loading states, and micro-interactions
- **Accessible Design** - WCAG compliant with keyboard navigation support

### 🔍 Job Search Experience
- **Advanced Search** - Multi-field search with real-time filtering
- **Smart Filters** - Location, job type, experience, salary range filters
- **Category Browse** - Explore jobs by technology and role categories
- **Detailed Job Views** - Comprehensive job information and company details
- **Application Tracking** - Visual status tracking for job applications

### 👤 User Management
- **Authentication Flow** - Clean login/signup with form validation
- **Profile Management** - Complete profile editing with image upload
- **Dashboard Views** - Personalized dashboards for students and recruiters
- **Application History** - Track all job applications in one place

## 🛠️ Tech Stack

### Core Framework
- **React 18** - Latest React with concurrent features
- **Vite 5.2.0** - Lightning-fast build tool and dev server
- **React Router Dom** - Client-side routing and navigation

### Styling & Animation
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Radix UI** - Accessible, unstyled UI components
- **Lucide React** - Beautiful SVG icon library

### State Management
- **Redux Toolkit** - Modern Redux with simplified API
- **React Hooks** - Built-in state management for components

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing and optimization
- **Vite Plugins** - Enhanced development experience

## 📁 Project Structure

```
frontend/
├── public/                    # Static assets
│   ├── vite.svg
│   └── index.html
├── src/
│   ├── components/           # React components
│   │   ├── admin/           # Admin/Recruiter components
│   │   │   ├── AdminJobs.jsx
│   │   │   ├── Companies.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── PostJob.jsx
│   │   ├── auth/            # Authentication components
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── shared/          # Shared components
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── ui/              # UI components (Radix)
│   │   │   ├── button.jsx
│   │   │   ├── input.jsx
│   │   │   └── [more...]
│   │   ├── Browse.jsx       # Job browsing page
│   │   ├── Home.jsx         # Landing page
│   │   ├── Jobs.jsx         # Job listings
│   │   └── Profile.jsx      # User profile
│   ├── hooks/               # Custom React hooks
│   │   ├── useGetAllJobs.jsx
│   │   ├── useGetAllCompanies.jsx
│   │   └── [more...]
│   ├── redux/               # State management
│   │   ├── authSlice.js
│   │   ├── jobSlice.js
│   │   ├── companySlice.js
│   │   └── store.js
│   ├── utils/               # Utility functions
│   │   ├── constant.js      # API endpoints
│   │   └── [more...]
│   ├── lib/                 # Library configurations
│   │   └── utils.js         # Tailwind utilities
│   ├── assets/              # Images and media
│   ├── App.jsx              # Main App component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── components.json           # Radix UI configuration
├── jsconfig.json            # JavaScript configuration
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind configuration
└── vite.config.js           # Vite configuration
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation Steps

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^18.2.0",                    // React library
  "react-dom": "^18.2.0",               // React DOM bindings
  "react-router-dom": "^6.15.0",        // Client-side routing
  "@reduxjs/toolkit": "^1.9.5",         // State management
  "react-redux": "^8.1.2"               // React Redux bindings
}
```

### UI & Animation
```json
{
  "framer-motion": "^10.16.4",          // Animation library
  "lucide-react": "^0.263.1",           // Icon library
  "@radix-ui/react-avatar": "^1.0.3",   // Avatar component
  "@radix-ui/react-dialog": "^1.0.4",   // Dialog component
  "@radix-ui/react-popover": "^1.0.6",  // Popover component
  "@radix-ui/react-select": "^1.2.2"    // Select component
}
```

### Styling
```json
{
  "tailwindcss": "^3.3.0",              // CSS framework
  "autoprefixer": "^10.4.14",           // CSS vendor prefixes
  "postcss": "^8.4.24",                 // CSS processing
  "clsx": "^2.0.0",                     // Conditional classes
  "tailwind-merge": "^1.14.0"           // Tailwind class merging
}
```

### HTTP & Utils
```json
{
  "axios": "^1.5.0",                    // HTTP client
  "sonner": "^1.0.3",                   // Toast notifications
  "react-hook-form": "^7.45.4"          // Form handling
}
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--purple-primary: #7C3AED;     /* Purple 600 */
--blue-primary: #2563EB;       /* Blue 600 */
--purple-light: #A78BFA;       /* Purple 400 */
--blue-light: #60A5FA;         /* Blue 400 */

/* Background Colors */
--bg-primary: #FAFAFA;         /* Gray 50 */
--bg-secondary: #F8FAFC;       /* Slate 50 */
--bg-card: #FFFFFF;            /* White */

/* Text Colors */
--text-primary: #111827;       /* Gray 900 */
--text-secondary: #6B7280;     /* Gray 500 */
--text-muted: #9CA3AF;         /* Gray 400 */
```

### Typography Scale
```css
/* Heading Styles */
.text-hero: 4rem;              /* 64px - Hero headings */
.text-display: 3rem;           /* 48px - Display headings */
.text-h1: 2.25rem;             /* 36px - H1 headings */
.text-h2: 1.875rem;            /* 30px - H2 headings */
.text-h3: 1.5rem;              /* 24px - H3 headings */

/* Body Text */
.text-body: 1rem;              /* 16px - Body text */
.text-sm: 0.875rem;            /* 14px - Small text */
.text-xs: 0.75rem;             /* 12px - Extra small */
```

## 🎭 Animation System

### Framer Motion Implementation

#### Page Transitions
```jsx
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

<motion.div
  variants={pageVariants}
  initial="initial"
  animate="animate"
  exit="exit"
  transition={{ duration: 0.3 }}
>
  Page Content
</motion.div>
```

#### Stagger Children
```jsx
const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};
```

## 🚀 Performance Optimization

### Code Splitting
```jsx
// Lazy loading for better performance
const Dashboard = lazy(() => import('./components/admin/Dashboard'));
const Profile = lazy(() => import('./components/Profile'));

// Wrap with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
</Suspense>
```

## 🧪 Testing

### Component Testing Setup
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

## 🚀 Build & Deployment

### Build Process
```bash
# Development build
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Deployment Platforms

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

<div align="center">
  <p>🎨 Frontend for JobHunt Platform</p>
  <p>Built with React, Vite, and Tailwind CSS</p>
</div>