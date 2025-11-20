import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import UpdateStudent from "./components/UpdateStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/update/:id" element={<UpdateStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
