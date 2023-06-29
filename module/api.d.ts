export interface ChatQuery{
    model: string;
    messages: {
        role: "system" | "user" | "assistant" | "function";
        name?: string;
        content?: string;
    }[];
    temperature?: number;
    top_p?: number;
    n?: number;
    max_tokens?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
    user?: string;
}

export interface ImageQuery{
    prompt: string;
    response_format?: "b64_json" | "url";
    size?: "256x256" | "512x512" | "1024x1024";
    n?: number;
    user?: string;
}

export interface ChatResult{
    id: string;
    object: string;
    created: number;
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
    choices: {
        index: number;
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
    }[];
}

export interface ImageResult{
    created: number;
    data: {
        url: string;
        b64_json: string;
    }[];
}

export interface ModelResult{
    object: string;
    data: {
        id: string;
        object: string;
        owned_by: string;
        permission: {
            id: string;
            object: string;
            created: number;
            allow_create_engine: boolean;
            allow_sampling: boolean;
            allow_logprobs: boolean;
            allow_search_indices: boolean;
            allow_view: boolean;
            allow_fine_tuning: boolean;
            organization: string;
            group: string | null;
            is_blocking: boolean;
        }[];
    }[];
}