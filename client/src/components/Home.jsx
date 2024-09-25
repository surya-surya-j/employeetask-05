import axios from "axios";
import  { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    position: "",
    dateOfJoining: "",
    salary: "",
  });

  const handleChange = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post(
      "http://localhost:8000/api/auth/signup",
      inputUser
    );
    console.log(res);
    setInputUser({
      name: "",
      email: "",
      phoneNumber: "",
      position: "",
      dateOfJoining: "",
      salary: "",
    });
    fetchAllUser();
  };

  const [userData, setUserData] = useState([]);
  const fetchAllUser = async () => {
    const res = await axios.get(
      "http://localhost:8000/api/auth/getallemployees"
    );
    console.log(res);
    setUserData(res.data.empData);
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `http://localhost:8000/api/auth/deleteemployee/${id}`
    );
    if (res.status === 200) {
      fetchAllUser();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-16">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">
        Employee Management
      </h1>

      {/* Form Section */}
      <div className="flex justify-center mb-16">
        <div className="bg-white w-full lg:w-1/2 p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Add Employee Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                label: "Name",
                type: "text",
                name: "name",
                placeholder: "Enter name",
              },
              {
                label: "Email",
                type: "email",
                name: "email",
                placeholder: "Enter email",
              },
              {
                label: "Phone Number",
                type: "text",
                name: "phoneNumber",
                placeholder: "Enter phone number",
              },
              {
                label: "Position",
                type: "text",
                name: "position",
                placeholder: "Enter position",
              },
              {
                label: "Date of Joining",
                type: "date",
                name: "dateOfJoining",
              },
              {
                label: "Salary",
                type: "number",
                name: "salary",
                placeholder: "Enter salary",
              },
            ].map((field, index) => (
              <div key={index} className="flex justify-between items-center">
                <label className="text-sm text-gray-600 w-1/3">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  className="w-2/3 py-2 px-4 text-sm bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={field.placeholder}
                  value={inputUser[field.name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3">SN</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone Number</th>
              <th className="px-6 py-3">Position</th>
              <th className="px-6 py-3">Date of Joining</th>
              <th className="px-6 py-3">Salary</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {userData.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">
                  No employees found.
                </td>
              </tr>
            ) : (
              userData.map((item, i) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.phoneNumber}</td>
                  <td className="px-6 py-4">{item.position}</td>
                  <td className="px-6 py-4">{item.dateOfJoining}</td>
                  <td className="px-6 py-4">{item.salary}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-4">
                      <NavLink
                        to={`/readuser/${item._id}`}
                        className="px-4 py-2 text-green-600 hover:bg-green-500 hover:text-white border border-green-600 rounded-md transition duration-200"
                      >
                        Read
                      </NavLink>
                      <NavLink
                        to={`/updateuser/${item._id}`}
                        className="px-4 py-2 text-yellow-600 hover:bg-yellow-600 border hover:text-white border-yellow-600 rounded-md transition duration-200"
                      >
                        Edit
                      </NavLink>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white border border-red-600 rounded-md transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
