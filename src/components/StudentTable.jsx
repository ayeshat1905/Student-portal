import StudentRow from "./StudentRow"

function StudentTable({ students, fetchStudents }) {
  console.log(students);
  return (
        <div className="table-wrapper">

    <table className="student-table">
       <thead>
    <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>EMAIL</th>
        <th>GRADE</th>
        <th>MARKS</th>
        <th>GPA</th>
        <th>FEE</th>
        <th>STATUS</th>
        <th>ACTIONS</th>
    </tr>
</thead>

        <tbody>
            {students.map((student)  => (
                <StudentRow
    key={student._id}
    student={student}
    fetchStudents={fetchStudents}
/>
            )
            )}
        </tbody>
        </table>
        </div>

  );
}

export default StudentTable;
