import { NextResponse, revalidateTag } from 'next/server'

export const revalidate = 0

export async function GET(_req) {
  revalidateTag('thankyounext')
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
