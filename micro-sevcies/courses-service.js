const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000; // port number

app.use(express.json());

// list of courses 
let courses = [
    { code: 'SWE311', name: 'Software Architecture', credits: 3 },
    { code: 'SWE496', name: 'Graduation Project I', credits: 2 }
];

//to display all the courses in the list 
app.get('/api/courses', (req, res) => {
    res.status(200).json(courses);
});

// 2. POST adding new course
app.post('/api/courses', async (req, res) => {
    const newCourse = {
        code: req.body.code,
        name: req.body.name,
        credits: req.body.credits
    };
    courses.push(newCourse);

    // axios is used to communicate with other sevices 
    try {
        await axios.post('http://localhost:3001/api/schedules', {
            courseCode: newCourse.code,
            courseName: newCourse.name
        });
        console.log(`[Courses Service]: Sent ${newCourse.code} to Schedules Service.`);
    } catch (error) {
        console.log('[Courses Service]: Schedules Service is offline, but course was added.');
    }

    res.status(201).json({ message: 'the course was added successfully ', data: newCourse });
});

app.listen(PORT, () => {
    console.log(`Courses Service is running on http://localhost:${PORT}`);
});