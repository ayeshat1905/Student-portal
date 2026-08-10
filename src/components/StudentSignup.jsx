import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
function StudentSignup() {
  const navigate = useNavigate();


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    // Name
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

  
    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    // Password
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    // Confirm Password
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const handleSignup = async () => {
  if (!validate()) return;

  try {
    const res = await axios.post(
      "http://localhost:5000/signup",
      {
        name: form.name,
        email: form.email,
        password: form.password,
      }
    );
console.log(res)
    alert(res.data.message);
    navigate("/");
  } catch (err) {
    setErrors({
      email: err.response?.data?.message || "Signup failed",
    });
  }
};
  return (
    <div className="signup-page">
      <div className="signup-card">

        <h2>Create Account</h2>

        <p className="subtitle">
          Register your student account
        </p>

        {/* Name */}
        <div className="form-group">
          <label>Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />

          {errors.name && (
            <p className="error">{errors.name}</p>
          )}
        </div>

     

        {/* Email */}
        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
          />

          {errors.email && (
            <p className="error">{errors.email}</p>
          )}
        </div>

       <div className="form-group">
  <label>Password</label>

  <div className="password-field">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Enter Password"
      
      value={form.password}
      onChange={handleChange}
    />

    <span
      className="eye-icon"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>

  {errors.password && (
    <p className="error">{errors.password}</p>
  )}
</div>
<div className="form-group">
  <label>Confirm Password</label>

  <div className="password-field">
    <input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      placeholder="Confirm Password"
      value={form.confirmPassword}
      onChange={handleChange}
    />

    <span
      className="eye-icon"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
    >
      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>

  {errors.confirmPassword && (
    <p className="error">{errors.confirmPassword}</p>
  )}
</div>

        <button
          className="signup-btn"
          onClick={handleSignup}
        >
          Create Account
        </button>
 <p className="signup-text">
          Already have a account.
          <Link to="/"> login</Link>
        </p>
      </div>
    </div>
  );
}

export default StudentSignup;