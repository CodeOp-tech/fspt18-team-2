import { useState, useEffect } from "react";

export function PostsList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  //console.log("posts:", posts);

  useEffect(() => {
    fetch("http://localhost:5001/posts")
    .then((res) => res.json())
    .then((json) => {
      setPosts(json);
    })
    .catch((error) => {
      setError("Woops, something went wrong")
    })
  }, []);

  return (
    <>
      <div className="p-8">
        <h1 className="pb-14 pt-14 text-right">FIND YOUR INSPIRATION</h1>
        <div className="p-8">
        </div>
        <div className="grid grid-cols-4 gap-6">
          {posts.map((post) => (
            <div className="flex flex-col" key={post.id}>
              <img src={post.Image1} alt={post.Title} />
              <p>{post.Title}</p>
              <p>{post.Category}</p>
              <p>{post.Body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}