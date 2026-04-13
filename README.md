# 🚗 Vehicle Catalog Management System

A full-stack web application for managing and displaying vehicle inventory with admin capabilities. Built with React, GraphQL, Node.js, and MongoDB.

## ✨ Features

- **Public Catalog**: Browse vehicles with advanced filtering and search
- **Admin Panel**: Full CRUD operations for vehicles, brands, and models
- **Image Management**: Upload and manage vehicle images via Cloudinary
- **Authentication**: JWT-based secure admin access
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: GraphQL subscriptions with Apollo Client

## 🛠️ Tech Stack

### Frontend

- React 18 with Vite
- Apollo Client (GraphQL)
- React Router v6
- Tailwind CSS
- Cloudinary for image uploads

### Backend

- Node.js with Express
- Apollo Server (GraphQL)
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account

## 🚀 Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd <project-name>
```

2. **Install dependencies**

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. **Environment Variables**

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
ADMIN_PASSWORD=your_admin_password
SERVER_PORT=4000

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_SECRET_KEY=your_cloudinary_secret_key
```

Create a `.env` file in the `client` directory:

```env
VITE_SERVER_URI=http://localhost:4000/graphql
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

4. **Run the application**

```bash
# Start backend (from server directory)
npm run dev

# Start frontend (from client directory)
npm run dev
```

The app will be available at:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000/graphql`

## 📱 Usage

### Admin Access

1. Navigate to `/login`
2. Default credentials: `admin` / your `ADMIN_PASSWORD`
3. **Important**: Update credentials immediately after first login

### Admin Features

- Create, update, and delete vehicles
- Manage brands and models
- Upload and manage vehicle images
- View inventory statistics

### Public Features

- Browse vehicle catalog
- Filter by brand, model, type, and transmission
- Search vehicles by multiple criteria
- View detailed vehicle information
- Contact via WhatsApp integration

## 🌐 Deployment

### Backend (Render.com)

1. Connect your GitHub repository
2. Set environment variables
3. Build command: `cd server && npm install`
4. Start command: `cd server && npm start`

### Frontend (Vercel)

1. Import your repository
2. Root directory: `client`
3. Framework: Vite
4. Add environment variables
5. Deploy

### MongoDB Atlas

- Whitelist IP: `0.0.0.0/0` for public access
- Or specific IPs for production

## 📝 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── views/         # Page components
│   │   ├── graphql/       # GraphQL queries/mutations
│   │   ├── hooks/         # Custom React hooks
│   │   └── config/        # Apollo Client config
│   └── ...
├── server/                # Node.js backend
│   ├── config/           # Database & server config
│   ├── graphql/          # GraphQL schemas & resolvers
│   ├── models/           # MongoDB models
│   └── index.js          # Entry point
└── .env                  # Environment variables
```

## 🔐 Security Notes

- Always change default admin credentials
- Use strong JWT secrets in production
- Configure CORS properly for your domains
- Keep dependencies updated

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue in the repository.
