import Link from "next/link";
import { BsSearchHeart } from "react-icons/bs";
import { TfiLayoutListPost } from "react-icons/tfi";
import { AiFillHome } from "react-icons/ai";
import { BiSolidUserCircle, BiSolidUserX, BiSolidUserCheck } from "react-icons/bi";
import { useAuth } from "../components/AuthContext";
import toast from 'react-hot-toast';
import { useRouter } from "next/router";

export default function Menu() {
  const { isLogged } = useAuth();
  const router = useRouter();

  const GoToCreatePostClick = () => {
    if (isLogged) 
      router.push("/creationpost");
    else
    {
      toast.error("You must be logged in to create a post.");
      router.push("#");
    }
  }

  return (
    <header className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex gap-6 justify-end">
      <Link href="/" className="flex items-center gap-2 text-neutral-700">
          <AiFillHome />
          <span>Home</span>
        </Link>

        <Link href="/search" className="flex items-center gap-2 text-neutral-700">
          <BsSearchHeart />
          <span>Explore</span>
        </Link>
        
        <a className="flex items-center gap-2" href="#" onClick={GoToCreatePostClick} >
          <TfiLayoutListPost />
          <span>Create Post</span>
        </a>
        
        {isLogged ? (
          <>
            <Link href="/login" className="flex items-center gap-2 text-pink-700">
              <BiSolidUserCheck />
              <span className="font-bold">Log Out</span>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="flex items-center gap-2 text-teal-400">
              <BiSolidUserX />
              <span>Log In</span>
            </Link>
            <Link href="/registration" className="flex items-center gap-2 text-amber-400">
              <BiSolidUserCircle />
              <span>Register</span>
            </Link>
          </>
        )}

      </div>
    </header>
  );
}
