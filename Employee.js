const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters long"],
            match: [/^[A-Za-z ]+$/, "Name can only contain letters and spaces"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address"
            ]
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
            match: [
                /^[0-9]{10,15}$/,
                "Phone number must contain 10 to 15 digits"
            ]
        },

        role: {
            type: String,
            required: [true, "Role is required"],
            trim: true,
            minlength: [2, "Role must be at least 2 characters long"]
        },

        department: {
            type: String,
            required: [true, "Department is required"],
            enum: {
                values: ["IT", "HR", "Finance", "Marketing", "Sales"],
                message: "Invalid department"
            }
        },

        salary: {
            type: Number,
            required: [true, "Salary is required"],
            min: [0, "Salary cannot be negative"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Employee", employeeSchema);