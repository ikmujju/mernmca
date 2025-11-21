const express =require("express");
const cors =require("cors");
const mongoose =require("mongoose");

const app=express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));


mongoose.connect("mongodb://localhost:27017/Studentdb")

const StudentSchema =new mongoose.Schema({
    name:String,
    age:Number,
    course:String,
});
const Student = mongoose.model("student",StudentSchema);

app.post("/student",async (req,res)=>{
    const student= new Student(req.body);
    await student.save();
    res.send({message:"Student added...."});
});

app.get("/student", async(req,res)=>{
    const student=await Student.find();
    res.send(student);
});

app.put("/student/:id", async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.send({ message: "Student Updated..." });
});

app.delete("/student/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send({ message: "Student Deleted..." });
});


app.listen(6767,()=> console.log("Port is running on http://localhost:6767"));
