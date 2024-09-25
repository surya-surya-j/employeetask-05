const Employee = require("../models/EmployeeModel");

const getAllEmployee = async (req, res) => {
  try {
    const empData = await Employee.find({});
    return res.status(200).json({
      empData,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports = getAllEmployee;
