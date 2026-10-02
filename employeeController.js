const Employee = require("../models/Employee");

// Get all employees
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get employees",
            error: error.message
        });
    }
};

// Add employee
const addEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);

        res.status(201).json({
            message: "Employee added successfully",
            employee
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to add employee",
            error: error.message
        });
    }
};

// Update employee
const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee updated successfully",
            employee
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update employee",
            error: error.message
        });
    }
};

// Delete employee
const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete employee",
            error: error.message
        });
    }
};

module.exports = {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
};