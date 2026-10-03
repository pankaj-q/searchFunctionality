import { Queue, RedisConnection } from "bullmq";
import { redis } from "./app.js";

const connection = new Redis("redis://localhost:6379", {
    maxRetriesPerRequest: null
})

const emailQueue = new Queue("Email",{connection})
export default emailQueue