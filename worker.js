import { Queue, Worker} from "bullmq";
import { redis } from "./app.js";

const connection = redis("redis://localhost:6379", {
    maxRetriesPerRequest: null
})

const worker = new Worker("emailQueue", async(job)=> {
    const email = job.data.email;
    await sendEamil(email)
    console.log("email send successfully")
},{connection})

export default worker
