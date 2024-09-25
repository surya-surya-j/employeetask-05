const Employee = require("../models/EmployeeModel");

const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const empData = await Employee.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
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
module.exports = updateEmployee;
