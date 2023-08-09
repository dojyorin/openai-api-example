const kv = await Deno.openKv();

export default kv;

export const t_session = "session";