export async function requestJson<T extends Record<keyof T, unknown>>(request:Request){
    try{
        return <T>await request.json();
    }
    catch{
        return undefined;
    }
}