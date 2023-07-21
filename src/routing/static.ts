import {OakRouter, mainPath} from "../../deps.ts";

const router = new OakRouter();

router.get("/", async(context)=>{
    await context.send({
        root: `${mainPath()}/src/client/application`,
        index: "index.html"
    });
});

export {router};