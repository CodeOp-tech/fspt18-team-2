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
    <header className="p-4 shadow-md">
      <div className="flex gap-6 justify-end">
        {isLogged ? (
          <>
            <Link href="/login" className="flex items-center gap-2">
              <BiSolidUserCheck />
              <span>LOGOUT</span>
            </Link>
            
            <Link className="flex items-center gap-2" href="/posts">
          <TfiLayoutListPost />
          <span>CREATE POST</span>
        </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="flex items-center gap-2">
              <BiSolidUserX />
              <span>LOGIN</span>
            </Link>
            <Link href="/registration" className="flex items-center gap-2">
              <BiSolidUserCircle />
              <span>REGISTER</span>
            </Link>
          </>
        )}

        <Link href="/" className="flex items-center gap-2">
          <AiFillHome />
          <span>HOME</span>
        </Link>

        <Link href="/search" className="flex items-center gap-2">
          <BsSearchHeart />
          <span>SEARCH</span>
        </Link>
        
        <a className="flex items-center gap-2" href="#" onClick={GoToCreatePostClick} >
          <TfiLayoutListPost />
          <span>CREATE POST</span>
        </a>

      </div>
    </header>
  );
}
