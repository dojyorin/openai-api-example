interface ModelId{
    id: string;
    object: string;
}

interface ResponseCreated{
    created: number;
}

export interface ChatCompletionMessage{
    role: "system" | "user" | "assistant";
    content: string;
}

export interface ChatCompletionRequest{
    model: string;
    messages: ChatCompletionMessage[];
    temperature?: number;
    top_p?: number;
    n?: number;
    stream?: boolean;
    stop?: string | string[];
    max_tokens?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
    logit_bias?: Record<string, number>;
    user?: string;
}

export interface ChatCompletionResponse extends ModelId, ResponseCreated{
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
    choices: {
        index: number;
        finish_reason: string;
        message: ChatCompletionMessage;
    }[];
}

export interface ImageGenerationRequest{
    prompt: string;
    response_format: "b64_json" | "url";
    size: "256x256" | "512x512" | "1024x1024";
    n?: number;
    user?: string;
}

export interface ImageGenerationResponse extends ResponseCreated{
    data: Record<ImageGenerationRequest["response_format"], string>[];
}

export interface ModelResponse extends ModelId{
    owned_by: string;
    permission: (ResponseCreated & ModelId & Record<`allow_${string}`, boolean>)[];
}

export interface ModelListResponse{
    object: string;
    data: ModelResponse[];
}