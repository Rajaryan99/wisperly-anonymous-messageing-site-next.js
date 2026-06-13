import { z } from "zod";

export const messageSchema = z.object({
    content: z
        .string()
        .min(10, {message: 'content must be of atleast 10 character'}) 
        .max(300, {message: 'content must be not more then 300 character'})

})

// in express or node.js if once we connect the DB and start the DB connection the server keeps on running that why we use cloude instence because backend should run continusly, whereas Next.js is completely different framework, it a edge time framework, in this the resource dont run continusly all the time as soon as user hit the request  the things gets exicuted. and specially when we write functons and all they run on time, whereas in other backend services once its connected the things keeps on runnning.
