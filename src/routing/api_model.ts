import {default as openai} from "../openai.ts";
import {createRouter} from "./utility.ts";

const router = createRouter();

router.get("/", async({response})=>{
    const {data} = await openai.listModels();

    response.body = {
        value: data
    };
});

export default router;