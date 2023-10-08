import Link from "next/link";
import { BsSearchHeart } from "react-icons/bs";
import { TfiLayoutListPost } from "react-icons/tfi";
import { AiFillHome } from "react-icons/ai";
import { BiSolidUserCircle, BiSolidUserX, BiSolidUserCheck } from "react-icons/bi";
import { useAuth } from "../components/AuthContext";

export default function Menu() {
  const { isLogged} = useAuth();

  return (
    <header className="p-4 shadow-md">
      <div className="flex gap-6 justify-end">
        
        
        {isLogged ? (
          <Link href="/logout" className="flex items-center gap-2">
            <BiSolidUserX />
            <span>LOGOUT</span>
          </Link> 
        ) : (
          <Link href="/login" className="flex items-center gap-2">
            <BiSolidUserCheck />
            <span>LOGIN</span>
          </Link> && <Link href="/registration" className="flex items-center gap-2">
          <BiSolidUserCircle />
          <span>REGISTER</span>
        </Link>
        )}
        
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
