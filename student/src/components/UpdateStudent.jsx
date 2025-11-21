import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function UpdateStudent() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", age: "", course: "" });
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/student`).then((res) => {
      const student = res.data.find((st) => st._id === id);
      if (student) setForm(student);
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    await api.put(`/student/${id}`, form);
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Student</h2>
      <form onSubmit={updateHandler}>
        <input name="name" value={form.name} onChange={handleChange} /><br /><br />
        <input name="age" value={form.age} type="number" onChange={handleChange} /><br /><br />
        <input name="course" value={form.course} onChange={handleChange} /><br /><br />
        <button>Update</button>
      </form>
    </div>
  );
}
