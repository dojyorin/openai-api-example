export function isGet({method}:Request){
    return method === "GET";
}

export function isPost({method}:Request){
    return method === "POST";
}

export async function requestJson<T extends Record<keyof T, unknown>>(request:Request){
    try{
        return <Partial<T>>await request.json();
    }
    catch{
        return undefined;
    }
}