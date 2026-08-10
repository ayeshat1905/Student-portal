import express from "express";
import bcrypt from "bcrypt";
import Student from "../models/student.js";

const router = express.Router();
 
router.post("/signup", async (req, res) => {
  console.log("API ",req.body)
  try {
    const { name, email, password } = req.body;

    const exists = await Student.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

  const result=  await Student.create({
      name,
      email,
      password: hash,
    });

    res.json({
      message: "Account Created Successfully",data: result
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
router.post("/add", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      id,
      grade,
      marks,
      gpa,
      fee,
      status,
    } = req.body;

    const emailExists = await Student.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const idExists = await Student.findOne({ id });

    if (idExists) {
      return res.status(400).json({
        message: "Student ID already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      id,
      grade,
      marks,
      gpa,
      fee,
      status,
    });

    res.status(201).json({
      message: "Student added successfully",
      student,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      student.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    res.json({
      message: "Login Successful",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(
      req.params.id
    );

    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json({
      message: "Student deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    res.json(students);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
export default router;