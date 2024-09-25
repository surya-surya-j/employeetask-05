import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GetEmployees = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSingleUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/auth/getemployee/${id}`
      );
      console.log(res);
      setUserData(res.data.empData);
    } catch (err) {
      setError("Failed to fetch user data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleUser();
  }, [id]);

  const downloadCSV = () => {
    if (!userData) return;

    const csvData = [
      [
        "Name",
        "Email",
        "Phone Number",
        "Position",
        "Date of Joining",
        "Salary",
      ],
      [
        userData.name,
        userData.email,
        userData.phoneNumber,
        userData.position,
        userData.dateOfJoining,
        userData.salary,
      ],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `${userData.name}_data.csv`);
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold">{error}</div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Employee Detail
        </h2>

        {userData && (
          <div className="space-y-5">
            <div className="flex justify-between items-center py-2 border-b border-gray-300">
              <span className="text-lg font-medium text-gray-700">Name:</span>
              <span className="text-lg text-gray-500">{userData.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-300">
              <span className="text-lg font-medium text-gray-700">Email:</span>
              <span className="text-lg text-gray-500">{userData.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-300">
              <span className="text-lg font-medium text-gray-700">
                Phone Number:
              </span>
              <span className="text-lg text-gray-500">
                {userData.phoneNumber}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-300">
              <span className="text-lg font-medium text-gray-700">
                Position:
              </span>
              <span className="text-lg text-gray-500">{userData.position}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-300">
              <span className="text-lg font-medium text-gray-700">
                Date of Joining:
              </span>
              <span className="text-lg text-gray-500">
                {userData.dateOfJoining}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-300">
              <span className="text-lg font-medium text-gray-700">Salary:</span>
              <span className="text-lg text-gray-500">{userData.salary}</span>
            </div>
          </div>
        )}

        <button
          onClick={downloadCSV}
          className="w-full mt-8 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default GetEmployees;
