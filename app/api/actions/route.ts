import { ACTIONS_CORS_HEADERS, ActionGetResponse } from "@solana/actions"

export const GET = (req: Request) => {

    const payload : ActionGetResponse = {
        icon: new URL("/solana_ai.webp", new URL(req.url).origin).toString(),
        label: "Send Memo",
        description: "This is a super simple action",
        title: "Memo Demo"
    }

    return Response.json(payload, {headers: ACTIONS_CORS_HEADERS});  
}


// This line gives you the maximum flexibility with the browsers
export const OPTIONS = GET;