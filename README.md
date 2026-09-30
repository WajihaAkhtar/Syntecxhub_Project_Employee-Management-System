# Employee Management System

A full-stack **Employee Management System** built using the **MERN stack**. This application allows users to manage employee information through a clean and responsive interface with complete CRUD functionality.

## 🚀 Features

* 🔐 Login and Logout
* 👤 Add new employees
* ✏️ Update employee information
* 🗑️ Delete employees
* 📋 Display all employees
* 🔎 Search employees by:

  * Name
  * Email
  * Role
  * Department
* 📊 Dashboard with:

  * Total employees
  * Total departments
  * Total salary
* ✅ Frontend form validation
* ✅ Backend validation using Mongoose
* 📱 Responsive design for desktop, tablet, and mobile
* 💾 Employee data stored in MongoDB
* 🔄 REST API integration using Axios

## 🛠️ Technologies Used

### Frontend

* React.js
* CSS3
* Axios
* JavaScript (ES6+)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* CORS
* dotenv

## 📁 Project Structure

```text
employee-management-system/
│
├── backend/
│   ├── controllers/
│   │   └── employeeController.js
│   │
│   ├── models/
│   │   └── Employee.js
│   │
│   ├── routes/
│   │   └── employeeRoutes.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── Login.jsx
    │   ├── Login.css
    │   ├── index.css
    │   └── main.jsx
    │
    └── package.json
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project folder:

```bash
cd employee-management-system
```

---

## 🔧 Backend Setup

Open a terminal inside the backend folder:

```bash
cd backend
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/employee_management
```

Start the backend server:

```bash
node server.js
```

The backend will run at:

```text
http://localhost:5000
```

---

## 💻 Frontend Setup

Open another terminal and move into the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## 🗄️ MongoDB

This project uses **MongoDB** to store employee information.

Database:

```text
employee_management
```

Collection:

```text
employees
```

Each employee contains:

* Name
* Email
* Phone
* Role
* Department
* Salary

## 🔌 API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| GET    | `/api/employees`     | Get all employees  |
| POST   | `/api/employees`     | Add a new employee |
| PUT    | `/api/employees/:id` | Update an employee |
| DELETE | `/api/employees/:id` | Delete an employee |

## 🔐 Demo Login

The current project uses a simple frontend demo login.

```text
Email: admin@gmail.com
Password: admin123
```

> Note: This login is intended for demonstration purposes. It is not a production authentication system.

## ✅ Validation

The application validates employee information before submitting it.

Examples include:

* Name cannot be empty
* Name should contain letters and spaces
* Email must have a valid format
* Phone number must contain 10–15 digits
* Role is required
* Department must be selected
* Salary cannot be negative
* Duplicate employee emails are prevented

Backend validation is also implemented using **Mongoose schema validation**.

## 📱 Responsive Design

The application is designed to work across different screen sizes:

* 💻 Desktop
* 📱 Mobile
* 📟 Tablet

The employee cards, forms, dashboard, navigation, and search section adapt to smaller screens.

## 📊 Dashboard

The dashboard provides a quick overview of employee information:

```text
Total Employees
Total Departments
Total Salary
```

These values are calculated dynamically from the employee data stored in MongoDB.

## 🔎 Employee Search

The search feature allows users to quickly find employees by searching:

```text
Name
Email
Role
Department
```

The employee list updates automatically while typing.

## 🎯 Project Purpose

This project was developed as part of a **web development internship** to practice building a complete MERN stack application and working with:

* React components
* REST APIs
* CRUD operations
* MongoDB
* Express.js
* Node.js
* Form validation
* Axios
* Responsive UI design

## 🔮 Future Improvements

Possible future improvements include:

* Secure backend authentication
* Password hashing
* Role-based access control
* Employee profile images
* Pagination
* Employee sorting
* Salary filtering
* Advanced dashboard charts
* Deployment to a cloud platform

## 👩‍💻 Author

**Wajiha Akhtar**

Computer Science Graduate
Web Development Intern
