const express = require('express');
const app = express();
const PORT = 3001; // port number

app.use(express.json());

// 
let availableCoursesForRegistration = [
    { courseCode: 'SWE311', totalSections: 2 }
];

// POST: استقبال المادة الجديدة من خدمة المواد وتجهيز شعبة افتراضية لها
app.post('/api/schedules', (req, res) => {
    const syncedCourse = {
        courseCode: req.body.courseCode,
        totalSections: 1 // فتح شعبة واحدة تلقائياً للمادة الجديدة
    };

    availableCoursesForRegistration.push(syncedCourse);
    
    console.log(`[Schedules Service Log]: Sync complete! Course ${req.body.courseCode} is now open for student registration.`);
    
    res.status(200).json({ success: true, message: 'the schedules was updated' });
});

app.listen(PORT, () => {
    console.log(`Schedules Service is running on http://localhost:${PORT}`);
});