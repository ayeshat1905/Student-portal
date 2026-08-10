import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function StudentRow({
    student,
    fetchStudents,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: student.name,
        email: student.email,
        grade: student.grade,
        marks: student.marks,
        gpa: student.gpa,
        fee: student.fee,
        status: student.status,
    });

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleEditClick = () => {
        setForm({
            name: student.name,
            email: student.email,
            grade: student.grade,
            marks: student.marks,
            gpa: student.gpa,
            fee: student.fee,
            status: student.status,
        });
        setIsEditing(true);
    };


    const handleCancel = () => {
        setIsEditing(false);
    };
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
 const handleSave = async () => {
  try {
    await axios.put(
      `${API_URL}/${student._id}`,
      form
    );

    alert("Updated Successfully");

    setIsEditing(false);

    fetchStudents();
  } catch (err) {
    console.log(err);
  }
};

const handleDelete = async () => {
  if (
    !window.confirm(
      "Delete this student?"
    )
  )
    return;

  try {
    await axios.delete(
      `${API_URL}/${student._id}`
    );

    alert("Deleted Successfully");

    fetchStudents();
  } catch (err) {
    console.log(err);
  }
};

    if (isEditing) {
        return (
            <tr>
                <td>{student.id}</td>
                <td>
                    <input
                        className="row-edit-input"
                        type="text"
                        value={form.name}
                        onChange={handleChange("name")}
                    />
                </td>
                <td>
                    <input
                        className="row-edit-input"
                        type="email"
                        value={form.email}
                        onChange={handleChange("email")}
                    />
                </td>
                <td>
                    <input
                        className="row-edit-input"
                        type="text"
                        value={form.grade}
                        onChange={handleChange("grade")}
                    />
                </td>
                <td>
                    <input
                        className="row-edit-input"
                        type="number"
                        value={form.marks}
                        onChange={handleChange("marks")}
                    />
                </td>
                <td>
                    <input
                        className="row-edit-input"
                        type="number"
                        value={form.gpa}
                        onChange={handleChange("gpa")}
                    />
                </td>
                <td>
                    <input
                        className="row-edit-input"
                        type="number"
                        value={form.fee}
                        onChange={handleChange("fee")}
                    />
                </td>
                <td>
                    <select
                        className="row-edit-input"
                        value={form.status}
                        onChange={handleChange("status")}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </td>
                <td>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </td>
            </tr>
        );
    }

    return (
        <tr>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.grade}</td>
            <td>{student.marks}</td>
            <td>{student.gpa}</td>
            <td>{student.fee}</td>
            <td>{student.status}</td>

            <td>
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              <button onClick={() => navigate(`/student/${student._id}`)
            }>
    View
</button>
            </td>
        </tr>
    );
}

export default StudentRow;
