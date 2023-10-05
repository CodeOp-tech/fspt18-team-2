import { PostsList } from './PostsList';


export default function Home() {

  return (
    <main>
      <Link href="/creationpost">CREATE POST</Link>
      <PostsList />
    </main>
  );
}
