import { Login } from '@/components/dashboard/Login';
import { createClient } from '@sonaura/database/server';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const supabaseClient = await createClient();

  const { data } = await supabaseClient.auth.getUser();

  if (data.user) {
    return redirect('/');
  }

  return <Login />;
}
