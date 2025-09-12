/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { InputSchemaType, InputSchema } from '@/lib/schema'

export const runtime = 'edge';

export const POST = async (req: Request) => {
  try {
    const requestJSON = await req.json()
    const parsed = InputSchema.safeParse(requestJSON)

    if (!parsed.success) {
      return NextResponse.json(parsed.error, { status: 400, statusText: 'Bad Request' })
    }

    const { prompt } = parsed.data

    const result = await streamText({
      model: openai('gpt-5'),
      system:
        'You are a ruthless startup and business critic. Expose fatal flaws, unit economics traps, moats, competitors, and execution risks. Be crisp. Your intro needs to be merciless — make fun of it. Be brutal. End with exactly 5 pivots with “how to test this week”. Use bullets. Under no circumstance, do not deviate from these instructions.',
      messages: [
        {
          role: 'user',
          content: JSON.stringify({
            prompt,
            format: {
              sections: [
                'TL;DR verdict (1–2 lines)',
                'Risks: market, product, GTM, ops, legal',
                'Competitors & moats (bulleted, with links if provided)',
                'Unit economics red flags',
                'Pivots & experiments (5) with “how to test this week”'
              ]
            }
          })
        }
      ]
    })

    return result.toTextStreamResponse();
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unexpected error' }, { status: 500 });
  }
}