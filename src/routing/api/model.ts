import {OakRouter} from "../../../deps.ts";
import {openai} from "../../openai.ts";

const router = new OakRouter();

router.get("/", async({response})=>{
    const {data} = await openai.listModels();

    response.body = {
        value: data
    };
});

export {router};