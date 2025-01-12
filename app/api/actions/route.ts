import {
    ActionPostResponse,
    createPostResponse,
    MEMO_PROGRAM_ID,
    ActionGetResponse,
    ActionPostRequest,
    ACTIONS_CORS_HEADERS,
  } from "@solana/actions";
  import {
    clusterApiUrl,
    ComputeBudgetProgram,
    Connection,
    PublicKey,
    Transaction,
    TransactionInstruction,
  } from "@solana/web3.js";

export const GET = (req: Request) => {

    const payload : ActionGetResponse = {
        icon: new URL("/solana_ai.webp", new URL(req.url).origin).toString(),
        label: "Solana AI blink",
        description: "This blink is meant for making the Ai transactions using an llm on the blink network",
        title: "Solana AI blink"
    }

    return Response.json(payload, {headers: ACTIONS_CORS_HEADERS});  
}


// This line gives you the maximum flexibility with the browsers
export const OPTIONS = GET;

export const POST = async (req: Request) => {
    
        const body: ActionPostRequest = await req.json();

        const account: PublicKey = new PublicKey(body.account);

        const transaction = new Transaction();

        transaction.add(

            ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: 1000,
            }),
            new TransactionInstruction({
                programId: new PublicKey(MEMO_PROGRAM_ID),
                data: Buffer.from("this is a simple memo message", "utf8"),
                keys: []
            })
        );

        transaction.feePayer = account;

        const connection = new Connection(clusterApiUrl("devnet"));
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        const payload: ActionPostResponse = await createPostResponse({
            fields: {
                type: "transaction",
                transaction,
            },
        })

        return Response.json(payload, { headers: ACTIONS_CORS_HEADERS});
}