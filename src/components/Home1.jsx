import Header from "./Header";
import StudentTable from "./StudentTable";
function Home1({ students, fetchStudents ,setStudents }) {
  return (
    <>
      <Header
        totalStudents={students.length}
          students={students}
        setStudents={setStudents}
      />

      <StudentTable
        students={students}
        fetchStudents={fetchStudents}
      />
    </>
  );
}

export default Home1;