import { redis } from "../../app.js";

const rateLimitter = async(req,res,next) => {
  const ip = req.ip;
  const request = await redis.incr(`rate_limit:${ip}`)
  if(request ==1){
    await redis.expire(`rate_limit:${ip}`, 60)
  }
  if(request > 5){
    return res.status(429).json({
        message: "too many requests"
    })
  }
  next();
  
}
export default rateLimitter;