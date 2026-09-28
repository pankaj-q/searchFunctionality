import express from 'express'
const app = express();


app.use(express.json());

app.get('/search', (req, res) => {
    return res.status(200).json({
        message: "Docker connected succesfully"
    })
})

export default app;
