interface SessionStore{
    update: Date;
    history: unknown[];
}

export const sessions = new Map<string, SessionStore>();

setInterval(()=>{
    const date = new Date();
    for(const [k, {update}] of sessions){
        (date - update)
    }
}, 3 * 60 * 60 * 1000);