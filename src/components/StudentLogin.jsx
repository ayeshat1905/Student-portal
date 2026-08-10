import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // const handleLogin = () => {
  //   if (!validate()) return;

  //   const students = JSON.parse(localStorage.getItem("students")) || [];

  //   const student = students.find(
  //     (s) =>
  //       s.email === email &&
  //       s.password === password
  //   );

  //   if (student) {
  //     localStorage.setItem(
  //       "loggedInStudent",
  //       JSON.stringify(student)
  //     );

  //     navigate(`/student/${student.id}`);
  //   } else {
  //     setErrors({
  //       login: "Invalid Email or Password."
  //     });
  //   }
  // };

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const handleLogin = async () => {
  if (!validate()) return;

  try {
    const res = await axios.post(
     `${API_URL}/login`,
      {
        email,
        password,
      }
    );

   

    navigate(`/student/${res.data.student.id}`);
  } catch (err) {
  console.log(err);
  console.log(err.response);

  setErrors({
    login: err.response?.data?.message || err.message,
  });
}
};
  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Student Login</h2>

        <p className="login-subtitle">
          Login to access your student dashboard.
        </p>

        {/* Email */}

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);

              setErrors((prev) => ({
                ...prev,
                email: "",
                login: ""
              }));
            }}
          />

          {errors.email && (
            <p className="field-error">{errors.email}</p>
          )}
        </div>

        {/* Password */}

        <div className="form-group">
          <label>Password</label>

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  password: "",
                  login: ""
                }));
              }}
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.password && (
            <p className="field-error">{errors.password}</p>
          )}
        </div>

        {errors.login && (
          <p className="login-error">{errors.login}</p>
        )}

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="signup-text">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default StudentLogin;