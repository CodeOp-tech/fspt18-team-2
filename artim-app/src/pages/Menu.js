import Link from 'next/link';
import { BsSearchHeart } from "react-icons/bs";
import { TfiLayoutListPost } from "react-icons/tfi";
import { AiFillHome } from "react-icons/ai";


export default function Menu() {
  return (
    <div className='menu_grid'>

      <div className='menu_item' >
        <Link href="/">HOME</Link>
        <AiFillHome/>
      </div> 

      <div className='menu_item' >
        <Link href="/search">SEARCH</Link>
        <BsSearchHeart/>
      </div>   
     
      <div className='menu_item'>
        <Link href="/creationpost">CREATE POST</Link>
        <TfiLayoutListPost/>
      </div>
    </div>
  );
}
