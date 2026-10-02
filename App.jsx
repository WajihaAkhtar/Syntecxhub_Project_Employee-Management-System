import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import "./App.css";

function App() {

    // ================================
    // LOGIN
    // ================================

    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("employeeLoggedIn") === "true"
    );


    // ================================
    // EMPLOYEES
    // ================================

    const [employees, setEmployees] = useState([]);


    // ================================
    // FORM DATA
    // ================================

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        department: "",
        salary: ""
    });


    // ================================
    // EDIT / ERROR / SEARCH
    // ================================

    const [editingId, setEditingId] = useState(null);

    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");


    // ================================
    // GET EMPLOYEES
    // ================================

    const fetchEmployees = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/employees"
            );

            setEmployees(response.data);

        } catch (error) {

            console.error(
                "Failed to fetch employees:",
                error
            );

        }

    };


    // ================================
    // FETCH AFTER LOGIN
    // ================================

    useEffect(() => {

        if (isLoggedIn) {
            fetchEmployees();
        }

    }, [isLoggedIn]);


    // ================================
    // LOGIN
    // ================================

    const handleLogin = () => {

        localStorage.setItem(
            "employeeLoggedIn",
            "true"
        );

        setIsLoggedIn(true);

    };


    // ================================
    // LOGOUT
    // ================================

    const handleLogout = () => {

        localStorage.removeItem(
            "employeeLoggedIn"
        );

        setIsLoggedIn(false);

    };


    // ================================
    // FORM INPUT CHANGE
    // ================================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError("");

    };


    // ================================
    // FORM VALIDATION
    // ================================

    const validateForm = () => {

        const nameRegex = /^[A-Za-z ]+$/;

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phoneRegex =
            /^[0-9]{10,15}$/;


        if (!formData.name.trim()) {

            return "Name is required.";

        }


        if (!nameRegex.test(formData.name.trim())) {

            return "Name should contain only letters and spaces.";

        }


        if (!formData.email.trim()) {

            return "Email is required.";

        }


        if (!emailRegex.test(formData.email.trim())) {

            return "Please enter a valid email address.";

        }


        if (!formData.phone.trim()) {

            return "Phone number is required.";

        }


        if (!phoneRegex.test(formData.phone.trim())) {

            return "Phone number should contain 10 to 15 digits.";

        }


        if (!formData.role.trim()) {

            return "Role is required.";

        }


        if (!formData.department) {

            return "Please select a department.";

        }


        if (formData.salary === "") {

            return "Salary is required.";

        }


        if (Number(formData.salary) < 0) {

            return "Salary cannot be negative.";

        }


        return "";

    };


    // ================================
    // ADD / UPDATE EMPLOYEE
    // ================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        const validationError = validateForm();


        if (validationError) {

            setError(validationError);

            return;

        }


        try {

            const employeeData = {

                ...formData,

                name: formData.name.trim(),

                email: formData.email.trim(),

                phone: formData.phone.trim(),

                role: formData.role.trim(),

                salary: Number(formData.salary)

            };


            // UPDATE

            if (editingId) {

                await axios.put(

                    `http://localhost:5000/api/employees/${editingId}`,

                    employeeData

                );


                alert(
                    "Employee updated successfully!"
                );


                setEditingId(null);

            }

            // ADD

            else {

                await axios.post(

                    "http://localhost:5000/api/employees",

                    employeeData

                );


                alert(
                    "Employee added successfully!"
                );

            }


            // Refresh employees

            await fetchEmployees();


            // Clear form

            setFormData({

                name: "",
                email: "",
                phone: "",
                role: "",
                department: "",
                salary: ""

            });


            setError("");

        } catch (error) {

            console.error(error);


            if (

                error.response &&

                error.response.data &&

                error.response.data.error &&

                error.response.data.error.includes(
                    "duplicate"
                )

            ) {

                setError(
                    "This email is already registered."
                );

            } else {

                setError(
                    "Something went wrong. Please try again."
                );

            }

        }

    };


    // ================================
    // EDIT EMPLOYEE
    // ================================

    const handleEdit = (employee) => {

        setEditingId(employee._id);


        setFormData({

            name: employee.name,

            email: employee.email,

            phone: employee.phone,

            role: employee.role,

            department: employee.department,

            salary: employee.salary

        });


        setError("");


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };


    // ================================
    // DELETE EMPLOYEE
    // ================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this employee?"

        );


        if (!confirmDelete) {

            return;

        }


        try {

            await axios.delete(

                `http://localhost:5000/api/employees/${id}`

            );


            alert(
                "Employee deleted successfully!"
            );


            await fetchEmployees();

        } catch (error) {

            console.error(error);


            alert(
                "Failed to delete employee!"
            );

        }

    };


    // ================================
    // CANCEL EDIT
    // ================================

    const handleCancel = () => {

        setEditingId(null);


        setFormData({

            name: "",
            email: "",
            phone: "",
            role: "",
            department: "",
            salary: ""

        });


        setError("");

    };


    // ================================
    // DASHBOARD CALCULATIONS
    // ================================

    const totalEmployees =
        employees.length;


    const totalDepartments =
        new Set(

            employees.map(
                (employee) =>
                    employee.department
            )

        ).size;


    const totalSalary =
        employees.reduce(

            (total, employee) =>

                total +
                Number(employee.salary),

            0

        );


    // ================================
    // SEARCH EMPLOYEES
    // ================================

    const filteredEmployees =
        employees.filter((employee) => {

            const search =
                searchTerm
                    .toLowerCase()
                    .trim();


            return (

                employee.name
                    .toLowerCase()
                    .includes(search)

                ||

                employee.email
                    .toLowerCase()
                    .includes(search)

                ||

                employee.role
                    .toLowerCase()
                    .includes(search)

                ||

                employee.department
                    .toLowerCase()
                    .includes(search)

            );

        });


    // ================================
    // SHOW LOGIN PAGE
    // ================================

    if (!isLoggedIn) {

        return (
            <Login
                onLogin={handleLogin}
            />
        );

    }


    // ================================
    // MAIN APPLICATION
    // ================================

    return (

        <div className="app">


            {/* ============================
                NAVBAR
            ============================ */}

            <header className="navbar">

                <div>

                    <h1>
                        Employee Management System
                    </h1>

                    <p>
                        Manage your employees easily
                    </p>

                </div>


                <button
                    className="navbar-logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </header>


            <main className="container">


                {/* ============================
                    DASHBOARD
                ============================ */}

                <section className="dashboard">


                    <div className="dashboard-card">

                        <h3>
                            Total Employees
                        </h3>

                        <p>
                            {totalEmployees}
                        </p>

                    </div>


                    <div className="dashboard-card">

                        <h3>
                            Departments
                        </h3>

                        <p>
                            {totalDepartments}
                        </p>

                    </div>


                    <div className="dashboard-card">

                        <h3>
                            Total Salary
                        </h3>

                        <p>
                            {totalSalary.toLocaleString()}
                        </p>

                    </div>


                </section>


                {/* ============================
                    EMPLOYEE FORM
                ============================ */}

                <section className="form-section">


                    <h2>

                        {editingId
                            ? "Edit Employee"
                            : "Add Employee"}

                    </h2>


                    {error && (

                        <p className="error-message">

                            {error}

                        </p>

                    )}


                    <form
                        onSubmit={handleSubmit}
                        noValidate
                    >


                        {/* NAME */}

                        <div className="form-group">

                            <label>
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={
                                    formData.name
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter employee name"
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="text"
                                name="email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter email"
                            />

                        </div>


                        {/* PHONE */}

                        <div className="form-group">

                            <label>
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={
                                    formData.phone
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter phone number"
                            />

                        </div>


                        {/* ROLE */}

                        <div className="form-group">

                            <label>
                                Role
                            </label>

                            <input
                                type="text"
                                name="role"
                                value={
                                    formData.role
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="e.g. Software Developer"
                            />

                        </div>


                        {/* DEPARTMENT */}

                        <div className="form-group">

                            <label>
                                Department
                            </label>

                            <select
                                name="department"
                                value={
                                    formData.department
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option value="">
                                    Select Department
                                </option>

                                <option value="IT">
                                    IT
                                </option>

                                <option value="HR">
                                    HR
                                </option>

                                <option value="Finance">
                                    Finance
                                </option>

                                <option value="Marketing">
                                    Marketing
                                </option>

                                <option value="Sales">
                                    Sales
                                </option>

                            </select>

                        </div>


                        {/* SALARY */}

                        <div className="form-group">

                            <label>
                                Salary
                            </label>

                            <input
                                type="number"
                                name="salary"
                                value={
                                    formData.salary
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter salary"
                                min="0"
                            />

                        </div>


                        {/* SUBMIT BUTTON */}

                        <button type="submit">

                            {editingId
                                ? "Update Employee"
                                : "Add Employee"}

                        </button>


                        {/* CANCEL */}

                        {editingId && (

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={
                                    handleCancel
                                }
                            >
                                Cancel
                            </button>

                        )}

                    </form>

                </section>


                {/* ============================
                    EMPLOYEE LIST
                ============================ */}

                <section className="employees-section">


                    {/* EMPLOYEE HEADER */}

                    <div className="employees-header">

                        <div>

                            <h2>
                                Employees
                            </h2>

                            <p>
                                Manage all your employees
                            </p>

                        </div>


                        {/* SEARCH */}

                        <div className="search-box">

                            <input
                                type="text"
                                placeholder="Search employees..."
                                value={
                                    searchTerm
                                }
                                onChange={(e) =>
                                    setSearchTerm(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>


                    {/* NO EMPLOYEES */}

                    {employees.length === 0 ? (

                        <p className="empty-message">

                            No employees added yet.

                        </p>

                    ) : filteredEmployees.length === 0 ? (

                        <p className="empty-message">

                            No employees found.

                        </p>

                    ) : (

                        <div className="employee-list">


                            {filteredEmployees.map(
                                (employee) => (

                                    <div
                                        className="employee-card"
                                        key={
                                            employee._id
                                        }
                                    >


                                        {/* NAME */}

                                        <h3>
                                            {employee.name}
                                        </h3>


                                        {/* EMAIL */}

                                        <p>

                                            <strong>
                                                Email:
                                            </strong>{" "}

                                            {employee.email}

                                        </p>


                                        {/* PHONE */}

                                        <p>

                                            <strong>
                                                Phone:
                                            </strong>{" "}

                                            {employee.phone}

                                        </p>


                                        {/* ROLE */}

                                        <p>

                                            <strong>
                                                Role:
                                            </strong>{" "}

                                            {employee.role}

                                        </p>


                                        {/* DEPARTMENT */}

                                        <p>

                                            <strong>
                                                Department:
                                            </strong>{" "}

                                            {employee.department}

                                        </p>


                                        {/* SALARY */}

                                        <p>

                                            <strong>
                                                Salary:
                                            </strong>{" "}

                                            {employee.salary}

                                        </p>


                                        {/* BUTTONS */}

                                        <div className="card-buttons">


                                            <button
                                                className="edit-button"
                                                onClick={() =>
                                                    handleEdit(
                                                        employee
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>


                                            <button
                                                className="delete-button"
                                                onClick={() =>
                                                    handleDelete(
                                                        employee._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>


                                        </div>


                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>


            </main>

        </div>

    );

}

export default App;

