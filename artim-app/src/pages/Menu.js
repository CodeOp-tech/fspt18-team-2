import Link from "next/link";
import { BsSearchHeart } from "react-icons/bs";
import { TfiLayoutListPost } from "react-icons/tfi";
import { AiFillHome } from "react-icons/ai";

// https://tailwind.build/classes

export default function Menu() {
  return (
    <header className="p-4 shadow-md">
      <div className="flex gap-6 justify-end">
        <Link href="/" className="flex items-center gap-2">
          <AiFillHome />
          <span>HOME</span>
        </Link>

        <Link href="/search" className="flex items-center gap-2">
          <BsSearchHeart />
          <span>SEARCH</span>
        </Link>

        <Link className="flex items-center gap-2" href="/posts">
          <TfiLayoutListPost />
          <span>CREATE POST</span>
        </Link>
      </div>
    </header>
  );
}
