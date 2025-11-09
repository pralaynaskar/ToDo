# 📝 Modern Todo App

A full-stack todo application with modern UI, authentication, and advanced features including dark mode, calendar view, and due date tracking.

---

## ✨ Features

- 🔐 **User Authentication** - Secure signup/login with JWT tokens
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 📅 **Calendar View** - Visual calendar with task indicators
- ⏰ **Due Dates & Times** - Set deadlines with datetime picker
- 🎯 **Priority Levels** - Low, Medium, High priority tasks
- ✅ **Task Management** - Create, update, complete, and delete tasks
- 🎨 **Modern UI** - Smooth animations with Framer Motion
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔔 **Smart Notifications** - Overdue and today badges
- 💾 **Cloud Database** - MySQL hosted on Aiven.io

---

## 🛠️ Tech Stack

### 🧩 Frontend

- **React** - UI library
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Calendar** - Calendar component
- **date-fns** - Date manipulation
- **Axios** - HTTP client

### ⚙️ Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MySQL2** - Database driver
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing

### 🗄️ Database

- **MySQL 8.0** - Relational database (Aiven.io)

---

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MySQL** (local or Aiven.io account) - [Aiven](https://aiven.io)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/pralaynaskar/ToDo.git
cd Todo
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

**Create **``** file in backend folder:**

```env
PORT=5000

# MySQL Configuration
DB_HOST=your-online-db-url(if any)
DB_PORT=12345
DB_USER=user_name
DB_PASSWORD=your_password
DB_NAME=db_name
DB_SSL_CA=./certs/ca.pem

# JWT Secret (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your_generated_secret_key_here
```

**Download SSL Certificate (if any):**

- Go to your online MySQL service
- Download the CA Certificate
- Save as `backend/certs/ca.pem`

---

### 3️⃣ Database Setup

Run this SQL on your MySQL database:

```sql
CREATE DATABASE todo;
USE todo;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  due_date DATETIME NULL,
  reminder BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### 4️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

**Create **``** file in frontend folder:**

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## ▶️ Running the Application

### 🖥️ Start Backend Server

```bash
cd backend
npm run dev
```

Backend runs on:\
👉 `http://localhost:5000`

---

### 💻 Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm start
```

Frontend runs on:\
👉 `http://localhost:3000`

### 🌐 Access the Application

Open your browser and navigate to:\
[**http://localhost:3000**](http://localhost:3000)

---

## 📁 Project Structure

```bash
todo-app/
├── backend/
│   ├── config/
│   │   └── db.js               # Database connection
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   └── todoController.js   # Todo CRUD operations
│   ├── middleware/
│   │   └── auth.js             # JWT verification
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   └── todoRoutes.js       # Todo endpoints
│   ├── certs/
│   │   └── ca.pem              # SSL certificate
│   ├── .env                    # Environment variables
│   ├── server.js               # Entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoItem.jsx         # Individual todo
│   │   │   ├── CalendarView.jsx     # Calendar component
│   │   │   ├── ThemeToggle.jsx      # Dark mode toggle
│   │   │   └── CustomCheckbox.jsx   # Checkbox component
│   │   ├── pages/
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Signup.jsx           # Signup page
│   │   │   └── TodoDashboard.jsx    # Main dashboard
│   │   ├── hooks/
│   │   │   └── useDarkMode.js       # Dark mode hook
│   │   ├── utils/
│   │   │   └── api.js               # API calls
│   │   ├── App.js
│   │   └── index.css
│   ├── .env
│   ├── tailwind.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🎯 Usage

### 🧑‍💻 Creating an Account

1. Click "Sign up" on the login page
2. Enter username, email, and password
3. Click "Create Account"

### 📝 Adding Tasks

1. Fill in the task title
2. Optionally add description, priority, and due date
3. Click "Add Task"

### ⚡ Managing Tasks

- **Complete**: Click the checkbox to mark as done
- **Edit**: Click the ✏️ icon to edit details
- **Delete**: Click the 🗑️ icon to remove

### 🗓️ Views

- **List View**: See all tasks in a list with filters
- **Calendar View**: Visual calendar showing tasks by date

### 🌙 Dark Mode

Click the sun/moon icon in the top right to toggle themes.

---

## 🔒 Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 24-hour expiration
- Protected API routes with authentication middleware
- SSL/TLS connection to database
- Environment variables for sensitive data
- CORS enabled for frontend-backend communication

---

## 🐛 Troubleshooting

### 🔧 Backend Connection Issues

- Verify `.env` credentials are correct
- Check Aiven IP whitelist settings
- Ensure SSL certificate is in `backend/certs/ca.pem`
- Update mysql2 package:
  ```bash
  npm install mysql2@latest
  ```

### 🌐 Frontend Not Connecting

- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Clear browser cache and localStorage
- Check browser console for errors

---

## 📝 API Endpoints

### 🔑 Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### 🧭 Todos (Protected)

- `GET /api/todos` - Get all user's todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

---

## 👤 Author

**Pralay Naskar**

- GitHub: [@pralaynaskar](https://github.com/pralaynaskar)
- LinkedIn: [Pralay Naskar](https://linkedin.com/in/pralaynaskar)

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Aiven](https://aiven.io/)
- [Create React App](https://create-react-app.dev/)

---

⭐️ If you found this project helpful, please give it a star!

