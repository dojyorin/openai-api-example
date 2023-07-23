import {Oak} from "../deps.ts";
import {router} from "./routing/routing.ts";
import {catchError, sendStatic} from "./mw/mod.ts";

const oak = new Oak();

oak.use(router.routes(), router.allowedMethods());
oak.use(sendStatic());
oak.use(catchError());

export {oak};