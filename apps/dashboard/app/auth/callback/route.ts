import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@sonaura/database/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabaseClient = await createClient();

    await supabaseClient.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL('/', requestUrl.origin));
}
