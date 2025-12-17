# 📱 Contact Manager - Full Stack Application

Modern contact management application built with React, Node.js, MongoDB, and Redux.

## 🚀 Features

- ✅ **Authentication**: JWT-based login/register
- ✅ **CRUD Operations**: Add, edit, delete contacts
- ✅ **Real-time Search**: Filter contacts by any field
- ✅ **Redux State Management**: Centralized state
- ✅ **Responsive Design**: Mobile-friendly UI
- ✅ **CI/CD Pipeline**: Automated deployment

## 🛠 Tech Stack

### Frontend
- **React 19** - UI library
- **Redux** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Formik + Yup** - Form handling
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Git

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd contact-manager

# Install all dependencies
npm run install:all

# Setup environment variables
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and JWT secret

# Start development servers
npm run dev
```

### Environment Variables

Create `server/.env`:
```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start both client and server
npm run dev --prefix client   # Client only
npm run dev --prefix server   # Server only

# Production
npm run build        # Build client for production
npm start           # Start production server

# Testing & Quality
npm run lint        # Lint client code
npm test           # Run server tests
```

## 🌐 Deployment

### Automatic Deployment (GitHub Actions)

1. Push to `main` branch
2. GitHub Actions will automatically:
   - Run tests and linting
   - Build the application
   - Deploy to production

### Manual Deployment

#### Client (Vercel)
```bash
cd client
npm run build
vercel --prod
```

#### Server (Railway)
```bash
cd server
railway deploy
```

## 📁 Project Structure

```
contact-manager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store, actions, reducers
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   └── config/        # Configuration
│   └── package.json
├── .github/workflows/     # CI/CD pipelines
└── package.json          # Root package.json
```

## 🔧 Development

### Adding New Features

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes
3. Test locally: `npm run dev`
4. Commit and push
5. Create Pull Request

### Code Style

- ESLint for JavaScript linting
- Prettier for code formatting
- Tailwind CSS for styling

## 🚀 CI/CD Pipeline

Automated workflows for:
- **Code Quality**: Linting and testing
- **Build Verification**: Ensure builds work
- **Deployment**: Auto-deploy to production
- **Monitoring**: Track deployment status

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Contacts (Protected)
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests if needed
5. Submit Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Daria Tkachenko**
- GitHub: [@your-username]
- Email: your-email@example.com

---

⭐ Star this repo if you find it helpful!