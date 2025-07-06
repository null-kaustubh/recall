# Recall - Link Management Made Simple

A modern, secure link management application that lets you save, organize, and manage your important links with ease. Whether it's a job posting on LinkedIn, inspiring Pinterest artwork, funny Instagram memes, or important blog posts - keep all your valuable links in one place.

## ✨ Features

- **Secure Authentication** - JWT-based user authentication with secure password handling
- **Link Management** - Create, read, update, and delete your saved links (recalls)
- **Clean UI** - Minimal, eye-pleasing interface built with Tailwind CSS
- **Light/Dark Mode** - Toggle between light and dark themes for comfortable viewing
- **Responsive Design** - Works seamlessly across desktop and mobile devices
- **Fast Performance** - Built with Vite for lightning-fast development and production builds
- **Real-time Feedback** - Toast notifications for user actions and error handling

## 🚀 Tech Stack

### Frontend

- **React** - Modern UI library for building interactive interfaces
- **Vite** - Next-generation frontend tooling for fast development
- **TypeScript** - Type-safe JavaScript for better development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **React Router** - Client-side routing for single-page application navigation
- **Axios** - Promise-based HTTP client for API requests

### Backend

- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework for Node.js
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for secure authentication
- **bcrypt** - Password hashing for security

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** for version control

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/null-kaustubh/recall.git
cd recall
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your environment variables in .env
MONGODB_URI=mongodb://localhost:27017/recall
JWT_SECRET=your-super-secret-jwt-key
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Configure your environment variables in .env.local
VITE_BACKEND_URL=http://localhost:3000
```

### 4. Database Setup

Make sure MongoDB is running on your system:

## 🏃‍♂️ Running the Application

### Development Mode

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

The application will be available at:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

### Production Build

**Backend:**

```bash
cd backend
tsc
npm run start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
recalls/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── middleware.ts
│   │   ├── utils.ts
│   │   └── index.ts
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── config.ts
│   │   └── App.tsx
│   ├── index.html
│   └── vite.config.ts
└── README.md
```

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for secure authentication:

1. **Sign Up** - Create a new account with username and password
2. **Sign In** - Authenticate with existing credentials
3. **Protected Routes** - Dashboard and API endpoints require valid JWT tokens
4. **Password Security** - Passwords are hashed using bcrypt before storage

## 📱 Usage

1. **Create Account** - Sign up with a unique username and secure password
2. **Add Recalls** - Save links with custom titles and descriptions
3. **Organize** - View all your saved recalls in a clean, organized interface
4. **Delete** - Remove recalls you no longer need

_Note: Edit and search functionality will be available in upcoming versions._

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Happy Link Managing! 🔗✨**

## 🌓 Theme Support

The application supports both light and dark themes:

- **Theme Toggle** - Click the sun/moon icon in the dashboard header to switch themes
- **Persistent Preference** - Your theme choice is saved in localStorage
- **System Preference** - Automatically detects and uses your system's color scheme preference
- **Smooth Transitions** - All theme changes include smooth color transitions

### Theme Features:

- **Light Mode** - Clean white background with dark text for bright environments
- **Dark Mode** - Dark background with light text for low-light environments
- **Automatic Detection** - Respects your system's color scheme preference
- **Manual Override** - You can manually switch themes regardless of system preference
