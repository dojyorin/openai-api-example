import {createRouter} from "./utility.ts";
import {default as api_chat} from "./api_chat.ts";
import {default as api_image} from "./api_image.ts";
import {default as api_model} from "./api_model.ts";

const router = createRouter();

const api = createRouter();
api.use("/chat", api_chat.routes(), api_chat.allowedMethods());
api.use("/image", api_image.routes(), api_image.allowedMethods());
api.use("/model", api_model.routes(), api_model.allowedMethods());

router.use("/api", api.routes(), api.allowedMethods());

router.get("/", ({response})=>{
    response.redirect("/application/");
});

export default router;