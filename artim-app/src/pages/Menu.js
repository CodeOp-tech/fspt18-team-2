// Menu.js
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
              className="flex items-center gap-2 text-purple-500"
            >
              <BiSolidUserCheck className="text-xl" />
              <span className="font-bold">LOGOUT</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="flex items-center gap-2 text-teal-400"
            >
              <BiSolidUserX className="text-xl" />
              <span className="font-bold">LOGIN</span>
            </Link>
            <Link
              href="/registration"
              className="flex items-center gap-2 text-teal-400"
            >
              <BiSolidUserCircle className="text-xl" />
              <span className="font-bold">REGISTER</span>
            </Link>
          </>
        )}

        <Link href="/" className="flex items-center gap-2 text-teal-400">
          <AiFillHome className="text-xl" />
          <span className="font-bold">HOME</span>
        </Link>

        <Link href="/search" className="flex items-center gap-2 text-teal-400">
          <BsSearchHeart className="text-xl" />
          <span className="font-bold">SEARCH</span>
        </Link>

        <Link className="flex items-center gap-2 text-teal-400" href="/posts">
          <TfiLayoutListPost className="text-xl" />
          <span className="font-bold">CREATE POST</span>
        </Link>
      </div>
    </header>
  );
}
