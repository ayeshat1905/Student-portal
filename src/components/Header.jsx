
import Table from "./Table";
import { useNavigate } from "react-router-dom";

function Header({ totalStudents, setStudents, students }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="header">

        <div className="header-info">
          <h1>Students</h1>
          <p>{totalStudents} total students</p>
        </div>

        <button
          className="student-login-btn"
          onClick={() => navigate("/")}
        >
          Student Login
        </button>

      </div>

      {/* Add Student Form */}
      <Table
        setStudents={setStudents}
        students={students}
      />
    </>
  );
}

export default Header;

