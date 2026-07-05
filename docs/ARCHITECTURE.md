# 🏗️ AgriProfit Architecture & Workflows

This document outlines the core system architecture, data flow, and user workflows of the AgriProfit platform.

## 1. High-Level System Architecture

AgriProfit operates on a decoupled architecture where the frontend handles state and UI rendering, while a lightweight Python proxy server securely handles external API communications.

```mermaid
graph TD
    %% Define Nodes
    User([👨‍🌾 Farmer / User])
    UI[🖥️ Frontend UI<br>HTML / Vanilla JS]
    Proxy[🛡️ Python Proxy Server<br>localhost:8080]
    Env[🔐 .env File<br>Hidden API Keys]
    Groq[(🧠 Groq AI API<br>Llama-3)]
    Offline[(📂 Offline KB<br>Local JSON Rules)]

    %% Connections
    User -->|Interacts with| UI
    UI -->|POST /api/chat| Proxy
    Proxy -->|Reads Key| Env
    Proxy -->|Forward Request + Bearer Token| Groq
    Groq -->|Returns JSON| Proxy
    Proxy -->|Returns JSON| UI
    UI -.->|If API Fails| Offline
    Offline -.->|Fallback Answer| UI
```

## 2. AgriBot AI Fallback Workflow

To ensure 100% uptime and reliability, the AI chatbot utilizes a cascading fallback mechanism. If the primary cloud AI provider fails (due to rate limits, network issues, or revoked keys), it gracefully degrades to a local offline knowledge base.

```mermaid
sequenceDiagram
    participant User
    participant Frontend as App.js (Frontend)
    participant Proxy as Server.py (Proxy)
    participant Groq as Groq API
    participant Offline as Offline KB

    User->>Frontend: Asks "What is best fertilizer for wheat?"
    Frontend->>Proxy: POST /api/chat
    
    rect rgb(240, 248, 255)
        Note over Proxy, Groq: Primary Strategy (Cloud AI)
        Proxy->>Groq: Request with Secure API Key
        alt Success
            Groq-->>Proxy: 200 OK (AI Response)
            Proxy-->>Frontend: 200 OK (AI Response)
            Frontend-->>User: Displays AI Answer
        else Failure (e.g., 403 or 429 Error)
            Groq-->>Proxy: 4xx/5xx Error
            Proxy-->>Frontend: 4xx/5xx Error
        end
    end

    rect rgb(255, 240, 240)
        Note over Frontend, Offline: Fallback Strategy (Offline)
        Frontend->>Frontend: Catches Error
        Frontend->>Offline: Query local keyword rules
        Offline-->>Frontend: Match found for "fertilizer" + "wheat"
        Frontend-->>User: Displays offline pre-programmed advice
    end
```

## 3. User Journey Workflow

The following flowchart illustrates the user's journey from landing on the application to receiving localized advisory.

```mermaid
flowchart TD
    Start([Launch AgriProfit]) --> Login{Is User Registered?}
    
    Login -->|No| Reg[Registration Screen]
    Reg --> Input[Input Name, State, District, Crop, Acres]
    Input --> Save[Save Profile to LocalStorage]
    Save --> Dash
    
    Login -->|Yes| Dash[Dashboard]
    
    Dash --> Chat[💬 Chat with AgriBot]
    Dash --> Roadmap[🚜 View Modern Farming Roadmap]
    Dash --> Weather[🌦️ Check Weather (Mocked)]
    Dash --> Academy[🎓 Read Agri-Academy Articles]
    
    Chat --> Localized[AI uses Profile Data for Context]
    Localized --> Advice[Receive Hyper-localized Advice]
```

## 4. Security Model

- **No Secrets in Browser:** The frontend JavaScript (`app.js`) contains absolutely zero API keys. 
- **Proxy Injection:** The Python `server.py` intercepts `/api/chat` requests, reads `GROQ_API_KEY` from the untracked `.env` file, and injects the `Authorization: Bearer` header server-side.
- **CORS & Access:** The proxy operates on the same origin (`localhost:8080`), avoiding complex CORS preflight issues while securing cross-origin requests to Groq.

