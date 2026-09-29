import express from 'express'
const app = express();
import searchRouter from './/src/route/searchRoute.js'


app.use(express.json());

app.get('/search', (req, res) => {
    return res.status(200).json({
        message: "Docker connected succesfully"
    })
app.use('/api', searchRouter);
})

export default app;
