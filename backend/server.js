const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const FILE = "students.json";

// ---- Helper: Read File ----
function readData() {
  if (!fs.existsSync(FILE)) return [];
  let data = fs.readFileSync(FILE, "utf-8");
  return JSON.parse(data || "[]");
}

// ---- Helper: Write File ----
function writeData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// ---- CREATE Student ----
app.post("/student", (req, res) => {
  let students = readData();
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  writeData(students);
  res.send({ message: "Student added", student: newStudent });
});

// ---- READ All Students ----
app.get("/student", (req, res) => {
  let students = readData();
  res.send(students);
});

// ---- UPDATE Student ----
app.put("/student/:id", (req, res) => {
  let students = readData();
  let id = Number(req.params.id);

  students = students.map((s) =>
    s.id === id ? { ...s, ...req.body } : s
  );

  writeData(students);
  res.send({ message: "Student Updated" });
});

// ---- DELETE Student ----
app.delete("/student/:id", (req, res) => {
  let students = readData();
  let id = Number(req.params.id);

  students = students.filter((s) => s.id !== id);

  writeData(students);
  res.send({ message: "Student Deleted" });
});

app.listen(6767, () =>
  console.log("Server running on http://localhost:6767")
);
