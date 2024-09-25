const Employee = require("../models/EmployeeModel");

const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const empData = await Employee.findByIdAndDelete({ _id: id });
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
module.exports = deleteEmployee;
