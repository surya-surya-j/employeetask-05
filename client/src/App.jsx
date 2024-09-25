import { Route, Routes } from "react-router-dom";



import GetEmloyees from "./components/GetEmployees";
import UpdateEmployee from "./components/UpdateEmployee";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/readuser/:id" element={<GetEmloyees />} />
        <Route path="/updateuser/:id" element={<UpdateEmployee />} />
      </Routes>
    </div>
  );
}

export default App;
