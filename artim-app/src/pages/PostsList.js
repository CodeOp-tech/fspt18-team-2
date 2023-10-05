import { useState, useEffect } from "react";
import Link from "next/link";

export function PostsList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/posts")
      .then((res) => res.json())
      .then((json) => {
        setPosts(json);
      })
      .catch((error) => {
        setError("Woops, something went wrong");
      });
  }, []);

  return (
    <>
      <div className="p-8">
        <h1 className="pb-14 pt-14 text-right">FIND YOUR INSPIRATION</h1>
        <div className="p-8"></div>
        <div className="grid grid-cols-4 gap-6">
          {posts.map((post) => (
            <div className="flex flex-col" key={post.id}>
              <Link href={`/post/${post.id}`} passHref>
                <img src={post.Image1} alt={post.Title} />
              </Link>
              <p>{post.Title}</p>
              <p>{post.Category}</p>
              <div dangerouslySetInnerHTML={{ __html: post.Body }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
