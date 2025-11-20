import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const [form, setForm] = useState({ name: "", age: "", course: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/student", form);
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} /><br /><br />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} /><br /><br />
        <input name="course" placeholder="Course" onChange={handleChange} /><br /><br />
        <button>Add Student</button>
      </form>
    </div>
  );
}
