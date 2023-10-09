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
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function Menu() {
  const { isLogged } = useAuth();
  const router = useRouter();

  const GoToCreatePostClick = () => {
    if (isLogged) router.push("/creationpost");
    else {
      toast.error("You must be logged in to create a post.");
      router.push("#");
    }
  };

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
              <span className="font-bold">Log Out</span>
            </Link>

            <Link className="flex items-center gap-2" href="/posts">
              <TfiLayoutListPost />
              <span>CREATE POST</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="flex items-center gap-2 text-teal-400"
            >
              <BiSolidUserX className="text-xl" />
              <span className="font-bold">Log In</span>
            </Link>
            <Link
              href="/registration"
              className="flex items-center gap-2 text-teal-400"
            >
              <BiSolidUserCircle className="text-xl" />
              <span className="font-bold">Sign Up</span>
            </Link>
          </>
        )}

        <Link href="/" className="flex items-center gap-2 text-teal-400">
          <AiFillHome className="text-xl" />
          <span className="font-bold">Home</span>
        </Link>

        <Link href="/search" className="flex items-center gap-2 text-teal-400">
          <BsSearchHeart className="text-xl" />
          <span className="font-bold">Explore</span>
        </Link>

        <a
          className="flex items-center gap-2"
          href="#"
          onClick={GoToCreatePostClick}
        >
          <TfiLayoutListPost />
          <span>CREATE POST</span>
        </a>

        <Link className="flex items-center gap-2 text-teal-400" href="/posts">
          <TfiLayoutListPost className="text-xl" />
          <span className="font-bold">Create</span>
        </Link>
      </div>
    </header>
  );
}
