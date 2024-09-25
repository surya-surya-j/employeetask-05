const express = require("express");
const createEmployee = require("../controllers/createEmployee");
const getAllEmployee = require("../controllers/getAllEmployee");
const getEmployee = require("../controllers/getEmployee");
const updateEmployee = require("../controllers/updateEmployee");
const deleteEmployee = require("../controllers/deleteEmployee");

const router = express.Router();

router.post("/signup", createEmployee);
router.get("/getallemployees", getAllEmployee);
router.get("/getemployee/:id", getEmployee);
router.put("/updateemployee/:id", updateEmployee);
router.delete("/deleteemployee/:id", deleteEmployee);

module.exports = router;
