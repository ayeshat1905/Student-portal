import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  age: String,
  gender: String,
  birthDate: String,
  address: String,
  grade: String,
  subject: String,
  marks: String,
  gpa: String,
  fee: String,
  classroom: String,
  dateOfEntry: String,
  status: String,
  image: String,
});

export default mongoose.model("Student", studentSchema);