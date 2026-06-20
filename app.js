const express = require('express');
const mongoose = require('mongoose');

app = express();
app.use(express.json());

// CONNECTING WITH DATABASE
const MONGOURI = 'mongodb://localhost:27017/school_db';

mongoose.connect(MONGOURI)
.then(() => console.log("MongoDB is connected."))
.catch(err => console.error("Database connection failed.", err));

// CREATING SCHEMA MODEL
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    course: { type: String, required: true },
    isEnrolled: { type: Boolean, default: true }
});

const Student = mongoose.model('Student', studentSchema);

/*========================================
    ROUTES (CREATE, RD, RD ONE, UPD, DEL)
=========================================*/

// CREATE (POST)

app.post('/api/students', async (req, res) => {
    const { name, age, course, isEnrolled } = req.body;

    if (!name || !age || !course) {
        return res.status(400).json({ message: "Name, Age, Course are required!" });
    }

    try {
        const newStudent = await Student.create({ name, age, course, isEnrolled });
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ ALL
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ ONLY ONE
app.get('/api/student/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "Invalid ID format or Server Error" });
    }
});

// UPDATE
app.put('/api/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
        res.status(200).json({ message: "Student updated successfully", updatedStudent });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE
app.delete('/api/students/:id', async (req, res) => {
    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deleteStudent) res.status(404).json({ message: "Student not found." });
        res.status(200).json({ message: "Student deleted successfully",  deleteStudent});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
