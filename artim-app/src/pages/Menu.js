import Link from "next/link";
import { BsSearchHeart } from "react-icons/bs";
import { TfiLayoutListPost } from "react-icons/tfi";
import { AiFillHome } from "react-icons/ai";
import {
  BiSolidUserCircle,
  BiSolidUserX,
  BiSolidUserCheck,
} from "react-icons/bi";
import { useAuth } from "../components/AuthContext";

export default function Menu() {
  const { isLogged } = useAuth();

  return (
    <header className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex gap-6 justify-end">
        {isLogged ? (
          <>
            <Link
              href="/login"
              className="flex items-center gap-2 text-pink-700"
            >
              <BiSolidUserCheck />
              <span className="font-bold">Log Out</span>
            </Link>

            <Link
              href="/posts"
              className="flex items-center gap-2 text-neutral-700"
            >
              <TfiLayoutListPost />
              <span>Create</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="flex items-center gap-2 text-teal-400"
            >
              <BiSolidUserX />
              <span>Log In</span>
            </Link>
            <Link
              href="/registration"
              className="flex items-center gap-2 text-amber-400"
            >
              <BiSolidUserCircle />
              <span>Register</span>
            </Link>
          </>
        )}

        <Link href="/" className="flex items-center gap-2 text-neutral-700">
          <AiFillHome />
          <span>Home</span>
        </Link>

        <Link
          href="/search"
          className="flex items-center gap-2 text-neutral-700"
        >
          <BsSearchHeart />
          <span>Explore</span>
        </Link>
      </div>
    </header>
  );
}
