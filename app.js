import express from 'express'

import searchRouter from './/src/route/searchRoute.js'
const app = express();

const redis = new redis(process.env.REDIS_URL);

app.use(express.json());

app.post('/create', async(req, res) => {
    const {name, email, password} = req.body;
    await redis.del("user:all");
    const user = await user.create({
        name, email, password
    })
    return res.json(user);
}) 

app.get('/search', (req, res) => {
    return res.status(200).json({
        message: "Docker connected succesfully"
    })
app.use('/api', searchRouter);
})

app.get('/get-with-redis', async (req, res) => {
    const cached = await redis.get("user: all");
    if(cached){
        const user = JSON.parse(cached);
        return res.json(user);
    }
    const user = await user.find({});
    await redis.set("user: all", JSON.stringify(user));
    return res.json(user);
})

export default app;
// import ioredis from 'ioredis';

// const redis = new redis(process.env.REDIS_URL);
// app.get('/get-with-redis', async (req, res) => {
//     const cached = await redis.get("user: all");
//     if(cached){
//         const user = JSON.parse(cached);
//         return res.json(user);
//     }
//     const user = await user.find({});
//     return res.json(user);
// })
