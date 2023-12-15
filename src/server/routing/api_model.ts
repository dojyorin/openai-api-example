import {Router} from "../../../deps.ts";
import {oai} from "../../backend/openai.ts";

const router = new Router();

router.get("/", async({response})=>{
    const {data} = await oai.models.list();

    response.body = {
        value: data
    };
});

export {router};