import { Inter } from 'next/font/google'
import Link from 'next/link';
import { PostsList } from './PostsList';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Link href="/posts">CREATE POST</Link>
      <PostsList />
    </main>
  );
}
