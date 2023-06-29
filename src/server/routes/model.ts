export async function route(request:Request){
    if(!isGet){
        return responseEnd(405);
    }

    const result = await fetchApi<ModelResult>("/models");

    return responseEnd(result.data);
}