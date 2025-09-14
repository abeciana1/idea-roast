/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    console.log('Reqmessages', messages)

    const result = streamText({
      model: openai("gpt-5-mini"),
      system: `
You are a ruthless startup and business critic. Be concise, brutal, and specific.
Follow EXACTLY this output format and section order, with clear headings:

1) TL;DR verdict (1–2 lines)
2) Risks: market, product, GTM, ops, legal (bullets)
3) Competitors & moats (bulleted; include links if provided in prompt)
4) Unit economics red flags (bullets with quick back-of-envelope)
5) Pivots & experiments (exactly 5). For each, include “how to test this week”.

Rules:
- No preamble before section 1.
- Use short bullets, not paragraphs, except the TL;DR (1–2 lines).
- Never deviate from the 5-section structure above.
      `.trim(),
      messages: convertToModelMessages(messages),
    });

    // ✅ Correct for useChat()
    return result.toUIMessageStreamResponse();
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unexpected error" }, { status: 500 });
  }
}
