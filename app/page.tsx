import { auth } from '@/server/auth';
import HomePage from './home';

export const runtime = 'edge';

export default async function Home() {
  const user = await auth();
  return <HomePage user={user} />;
}
