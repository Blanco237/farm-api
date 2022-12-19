const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


app.post('/calendar', async (req, res) => {
    const { input } = req.body;
    const calendar = await getCalendar(input);
    res.json(calendar);
})

app.listen(5000, () => {
    console.log("Server running on Port 5000");
})



const getCalendar = async (input) => {
    const Model = require('./model');

    const calendarModel = new Model();

    await calendarModel.init();

    calendarModel.train();

    const calendar = calendarModel.genCalendar(input);

    return calendar;
}
