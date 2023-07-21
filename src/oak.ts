import {Oak} from "../deps.ts";
import {router} from "./routing/routing.ts";
import {errorResponse} from "./mw/mod.ts";

const oak = new Oak();

oak.use(router.routes(), router.allowedMethods());
oak.use(errorResponse());

export {oak};