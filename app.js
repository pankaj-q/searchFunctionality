import express from 'express'
const app = express();


app.use(express.json());

app.get('/search', (req, res) => {
    res.send("Check now");
})

export default app;
