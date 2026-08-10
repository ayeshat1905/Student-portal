import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Home1 from "./components/Home1";
import StudentDetails from "./components/Studentdetail";
import StudentLogin from "./components/StudentLogin";
import StudentSignup from "./components/StudentSignup";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/"
      );
  console.log("API hit",res)
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <Home1
            students={students}
            setStudents={setStudents}
            fetchStudents={fetchStudents}
          />
        }
      />

      <Route
        path="/student/:id"
        element={<StudentDetails fetchStudents={fetchStudents} />}
      />

      <Route path="/" element={<StudentLogin />} />

      <Route path="/signup" element={<StudentSignup />} />
    </Routes>
  );
}

export default App;