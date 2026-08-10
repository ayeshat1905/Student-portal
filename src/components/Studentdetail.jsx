

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function StudentDetails({ students, setStudents }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);



  // Fetch student
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/${id}`
        );

        setFormData(res.data);
      } catch (err) {
        console.error(err);
        alert(
          err.response?.data?.message ||
            "Failed to load student"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Optional size check
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // Update student
  const handleUpdate = async () => {
    try {
      setUpdating(true);

      const res = await axios.put(
        `http://localhost:5000/${id}`,
        formData
      );

      // Update students list in parent state
      if (setStudents && students) {
        setStudents(
          students.map((student) =>
            student._id === id
              ? res.data.student || formData
              : student
          )
        );
      }

      alert(
        res.data.message || "Student updated successfully"
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Update Failed"
      );
    } finally {
      setUpdating(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="details-loading">
        <div className="loading-spinner"></div>
        <p>Loading student details...</p>
      </div>
    );
  }

  // If student not found
  if (!formData) {
    return (
      <div className="details-not-found">
        <h2>Student Not Found</h2>
        <p>
          The student information could not be loaded.
        </p>

        <button
          className="btn-back"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Generate initials
  const initials = formData.name
    ? formData.name
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className="student-details-page">
 
      {/* Top navigation */}
      <div className="details-header">

        <div>
          <button
            className="back-link"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>

          <h1>Student Details</h1>

          <p>
            View and update student information
          </p>
        </div>

      </div>

      {/* Main card */}
      <div className="profile-card">

        {/* Profile Header */}
        <div className="profile-top">

          <div className="profile-avatar-section">

            <div className="profile-avatar">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt={formData.name || "Student"}
                  className="avatar-image"
                />
              ) : (
                initials
              )}
            </div>

            <label
              htmlFor="imageUpload"
              className="upload-btn"
            >
              📷 Change Photo
            </label>

            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />

          </div>

          <div className="profile-heading">

            <span className="profile-label">
              STUDENT PROFILE
            </span>

            <h2>{formData.name}</h2>

            <p>{formData.email}</p>

            <span
              className={`status-badge ${
                formData.status === "Inactive"
                  ? "inactive"
                  : "active"
              }`}
            >
              <span className="status-dot"></span>
              {formData.status || "Active"}
            </span>

          </div>

        </div>

        {/* Details */}
        <div className="profile-details-grid">

          {/* Personal Details */}
          <div className="profile-section">

            <div className="section-heading">
              <div className="section-icon">
                👤
              </div>

              <div>
                <h3>Personal Details</h3>
                <p>Basic student information</p>
              </div>
            </div>

            <div className="profile-field">
              <label>Name</label>

              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </div>

            <div className="profile-field">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>

            <div className="profile-row">

              <div className="profile-field">
                <label>Age</label>

                <input
                  type="number"
                  name="age"
                  value={formData.age || ""}
                  onChange={handleChange}
                  placeholder="Age"
                />
              </div>

              <div className="profile-field">
                <label>Gender</label>

                <select
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>
                </select>
              </div>

            </div>

            <div className="profile-field">
              <label>Birth Date</label>

              <input
                type="date"
                name="birthDate"
                value={
                  formData.birthDate
                    ? formData.birthDate.substring(0, 10)
                    : ""
                }
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Address</label>

              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </div>

          </div>

          {/* Academic Details */}
          <div className="profile-section">

            <div className="section-heading">
              <div className="section-icon">
                🎓
              </div>

              <div>
                <h3>Academic Details</h3>
                <p>Academic and classroom information</p>
              </div>
            </div>

            <div className="profile-row">

              <div className="profile-field">
                <label>Grade</label>

                <input
                  type="text"
                  name="grade"
                  value={formData.grade || ""}
                  onChange={handleChange}
                  placeholder="Grade"
                />
              </div>

              <div className="profile-field">
                <label>Subject</label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject || ""}
                  onChange={handleChange}
                  placeholder="Subject"
                />
              </div>

            </div>

            <div className="profile-row">

              <div className="profile-field">
                <label>Marks</label>

                <input
                  type="number"
                  name="marks"
                  value={formData.marks || ""}
                  onChange={handleChange}
                  placeholder="Marks"
                />
              </div>

              <div className="profile-field">
                <label>GPA</label>

                <input
                  type="text"
                  name="gpa"
                  value={formData.gpa || ""}
                  onChange={handleChange}
                  placeholder="GPA"
                />
              </div>

            </div>

            <div className="profile-row">

              <div className="profile-field">
                <label>Fee</label>

                <input
                  type="number"
                  name="fee"
                  value={formData.fee || ""}
                  onChange={handleChange}
                  placeholder="Fee"
                />
              </div>

              <div className="profile-field">
                <label>Classroom</label>

                <input
                  type="text"
                  name="classroom"
                  value={formData.classroom || ""}
                  onChange={handleChange}
                  placeholder="Classroom"
                />
              </div>

            </div>

            <div className="profile-field">
              <label>Date Of Entry</label>

              <input
                type="date"
                name="dateOfEntry"
                value={
                  formData.dateOfEntry
                    ? formData.dateOfEntry.substring(0, 10)
                    : ""
                }
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Status</label>

              <select
                name="status"
                value={formData.status || ""}
                onChange={handleChange}
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

          </div>

        </div>

        {/* Bottom buttons */}
        <div className="profile-buttons">

          <button
            className="btn-cancel"
            onClick={() => navigate("/dashboard")}
            disabled={updating}
          >
            Cancel
          </button>

          <button
            className="btn-update"
            onClick={handleUpdate}
            disabled={updating}
          >
            {updating ? (
              <>
                <span className="button-spinner"></span>
                Updating...
              </>
            ) : (
              <>
                ✓ Update Student
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}

export default StudentDetails;

