import express from 'express'
import rateLimitter from './src/middleware/ratelimit.js'
import sendEmail from './src/config/sendEmail.js';
import Redis from 'ioredis';

import searchRouter from './/src/route/searchRoute.js'
import emailQueue from './worker.js';
const app = express();

export const redis = new redis(process.env.REDIS_URL);

app.use(express.json());

app.post('/create', async(req, res) => {
    const {name, email, password} = req.body;
    await redis.del("user:all");
    const user = await user.create({
        name, email, password
    })
    await emailQueue.add("send-email",{email})
    return res.json(user);
}) 

app.get('/search',rateLimitter, (req, res) => {
    return res.status(200).json({
        message: "Docker connected succesfully"
    })

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

//otp store in redis 
app.post('/send-otp', async(req,res) => {
    const {email, mobile} = req.body;
    const otp = Math.floor(1000000+Math.random()*900000).toString();
    await redis.set(`user:${email}`,otp, "EX",15);
    return res.status(201).json({otp});
})

app.get('verify-otp', async(req, res)=> {
    const {email, otp}= req.body;
    const cachedOTP = await redis.get(`otp:${email}`)
    if (!cachedOTP) {
      return res.status(400).json({
        message: "otp not verified or not send to the right user",
      });
    }
    if (cachedOTP != otp){
        return res.status(400).json({
            message: "incorrect otp"
        })
    } return res.json({
        message: "otp verified"
    });
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
