import axios from 'axios';
import  { useState } from 'react';

const Table = ({setStudents, students}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [grade, setGrade] = useState('');
    const [marks, setMarks] = useState('');
    const [gpa, setGpa] = useState('');
    const [fee, setFee] = useState('');
    const [status, setStatus] = useState('');
const [password, setPassword] = useState("");
const [errors, setErrors] = useState({});
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  if (name.trim() === "")
    newErrors.name = "Please enter a name";

  if (email.trim() === "")
    newErrors.email = "Please enter an email";
  else if (!emailRegex.test(email))
    newErrors.email = "Please enter a valid email address";

  if (students.some((student) => student.email === email))
    newErrors.email = "Email already exists";

  if (id.trim() === "")
    newErrors.id = "Please enter an ID";

  if (grade.trim() === "")
    newErrors.grade = "Please enter a grade";

  if (marks.trim() === "")
    newErrors.marks = "Please enter marks";

  if (gpa.trim() === "")
    newErrors.gpa = "Please enter a GPA";

  if (fee.trim() === "")
    newErrors.fee = "Please enter fees";
if (password.trim() === "") {
  newErrors.password = "Please enter a password";
}
  if (status.trim() === "")
    newErrors.status = "Please enter a status";

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    return;
  }
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const newStudent = {
    name,
    email,
    id,
      password,
    grade,
    marks,
    gpa,
    fee,
    status,
  };

  try {
    const res = await axios.post(
      `${API_URL}/add`,
      newStudent
    );

    console.log("API response:", res.data);

    // Add returned MongoDB student to React state
    setStudents([...students, res.data.student]);

    // Clear form
    setName("");
    setEmail("");
    setId("");
    setGrade("");
    setMarks("");
    setGpa("");
    setFee("");
    setStatus("");
    setErrors({});

  } catch (err) {
    console.log("Add student error:", err);

    setErrors({
      email: err.response?.data?.message || "Failed to add student",
    });
  }
};
    const clearError = (field) => {
        setErrors((prev) => {
            if (!prev[field]) return prev;
            const next = { ...prev };
            delete next[field];
            return next;
        });
    };

    return (
   <>
   <div className="student-form">
            <h2>Add Student</h2>
          <form onSubmit={handleSubmit} noValidate>

<div className="form-field">
<input
type="text"
placeholder="Student Name"
value={name}
onChange={(e)=>{ setName(e.target.value); clearError("name"); }}
/>
{errors.name && <p className="field-error">{errors.name}</p>}
</div>

<div className="form-field">
<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>{ setEmail(e.target.value); clearError("email"); }}
/>
{errors.email && <p className="field-error">{errors.email}</p>}

</div>

<div className="form-field">
<input
type="text"
placeholder="Student ID"
value={id}
onChange={(e)=>{ setId(e.target.value); clearError("id"); }}
/>
{errors.id && <p className="field-error">{errors.id}</p>}
</div>

<div className="form-field">
<input
type="text"
placeholder="Grade"
value={grade}
onChange={(e)=>{ setGrade(e.target.value); clearError("grade"); }}
/>
{errors.grade && <p className="field-error">{errors.grade}</p>}
</div>

<div className="form-field">
<input
type="number"
placeholder="Marks"
value={marks}
onChange={(e)=>{ setMarks(e.target.value); clearError("marks"); }}
/>
{errors.marks && <p className="field-error">{errors.marks}</p>}
</div>
<div className="form-field">
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => {
      setPassword(e.target.value);
      clearError("password");
    }}
  />

  {errors.password && (
    <p className="field-error">{errors.password}</p>
  )}
</div>
 
<div className="form-field">
<input
type="number"
placeholder="GPA"
value={gpa}
onChange={(e)=>{ setGpa(e.target.value); clearError("gpa"); }}
/>
{errors.gpa && <p className="field-error">{errors.gpa}</p>}
</div>

<div className="form-field">
<input
type="number"
placeholder="Fee"
value={fee}
onChange={(e)=>{ setFee(e.target.value); clearError("fee"); }}
/>
{errors.fee && <p className="field-error">{errors.fee}</p>}
</div>

<div className="form-field">
<select
value={status}
onChange={(e)=>{ setStatus(e.target.value); clearError("status"); }}
>
<option value="">Select Status</option>
<option value="Active">Active</option>
<option value="Inactive">Inactive</option>
</select>
{errors.status && <p className="field-error">{errors.status}</p>}
</div>

<button type="submit">
Add Student
</button>

</form>

        </div>


   </>    )

};

export default Table;
