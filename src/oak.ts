import {Oak} from "../deps.ts";
import {router} from "./routing/routing.ts";
import {catchError, sendStatic} from "./mw/mod.ts";

const oak = new Oak();

oak.use(catchError());
oak.use(sendStatic());
oak.use(router.routes(), router.allowedMethods());

export {oak};