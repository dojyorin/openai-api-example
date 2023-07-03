# **OpenAI API Example**

Example of generative AI service using OpenAI API.

# Diagram

```mermaid
flowchart TD

subgraph "Backend"
    A(["OpenAI"])
    B(["GitHub"])
end

subgraph "Hosting"
    C(["Deno Deploy\nopenai-api-example.deno.dev"])
end

A <--"JSON API"--> C
B -."Push to Deploy".-> C

C <--> D("Web Client")
```