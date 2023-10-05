import { PostsList } from './PostsList';
import Menu from '@/pages/Menu';

export default function Home() {

  return (
    <main>
      <Link href="/creationpost">CREATE POST</Link>
      <PostsList />
    </main>
  );
}
