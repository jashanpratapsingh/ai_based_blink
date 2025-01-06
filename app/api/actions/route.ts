import { ActionGetResponse } from "@solana/actions"

export const GET = (req: Request) => {

    const payload : ActionGetResponse = {}

    return Response.json(payload)
}