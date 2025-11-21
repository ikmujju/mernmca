import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function StudentList() {
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    const res = await api.get("/student");
    setStudents(res.data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  const deleteStudent = async (id) => {
    await api.delete(`/student/${id}`);
    getStudents(); // refresh list
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student List</h2>
      <Link to="/add"><button>Add Student</button></Link>
      <br /><br />
      {students.map((s) => (
        <div key={s._id} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
          <p><b>Name:</b> {s.name}</p>
          <p><b>Age:</b> {s.age}</p>
          <p><b>Course:</b> {s.course}</p>
          <Link to={`/update/${s.id}`}><button>Edit</button></Link>
          &nbsp;
          <button onClick={() => deleteStudent(s.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
