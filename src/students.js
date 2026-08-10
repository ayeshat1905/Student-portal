let Id=1;
function makeStudent(name, email, studentId, className, attendance, gpa, fees, status) {
    return {  
        name, 
        email, 
        id, 
        grade, 
        marks, 
        gpa, 
        fees, 
        status  };
}

export const initialStudents = [
    makeStudent("John Doe", "john.doe@example.com", "S001", "10th Grade", 95, 3.8, 5000, "Active"),
    makeStudent("Jane Smith", "jane.smith@example.com", "S002", "11th Grade", 88, 3.5, 5000, "Active"),
];