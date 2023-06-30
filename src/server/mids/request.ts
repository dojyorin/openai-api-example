export async function requestJson<T extends Record<keyof T, unknown>>(request:Request){
    try{
        return <Partial<T>>await request.json();
    }
    catch{
        return undefined;
    }
}