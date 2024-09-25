const Employee = require("../models/EmployeeModel");

const createEmployee = async (req, res) => {
  try {
    const data = req.body;

    // Create a new Employee instance with all required fields
    const user = new Employee({
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      dateOfJoining: data.dateOfJoining,
      salary: data.salary,
      position: data.position, // Ensure position is included
    });

    // Save the employee data
    const savedUser = await user.save();

    // Log saved user data (optional)
    console.log(savedUser);

    // Send response with saved user data
    return res.status(200).json({
      userData: savedUser, // Return saved user data in the response
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error creating employee:", error); // Log error to server
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = createEmployee;
