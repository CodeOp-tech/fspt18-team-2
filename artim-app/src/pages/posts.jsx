import { useState } from "react";
import dynamic from 'next/dynamic';

var Editor = dynamic(() => import("../components/Editor"), {
  ssr: false
})

export default function Posts() {
  const [error, setError] = useState("");
  const [post, setPost] = useState({
    userID: 1,
    title: "",
    category: "",
    body: "",
    image1: "",
    image2: "",
    image3: "",
    video: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    setPost((post) => {
      return {
        ...post,
        [key]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPost(post);
  };

  const addPost = async (post) => {
    try {
      const response = await fetch("http://localhost:5001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: 1,
          title: post.title,
          category: post.category,
          body: post.body,
          image1: post.image1,
          image2: post.image2,
          image3: post.image3,
          video: post.video,
        }),
      });

      
      if (response.ok) {
        console.log(post);
        const posts = await response.json();
        setPost({
          userID: 1,
          title: "",
          category: "",
          body: "",
          image1: "",
          image2: "",
          image3: "",
          video: "",
        });
        return posts;
      }
      setError("oups, something went wrong");
    } catch (error) {
      setError("oups, something went wrong");
    }
  };

  return (
    <div className="p-10">
      <main>
        <form className="p-8 border border-solid text-center" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="p-8 text-xl">New post</h1>
          <div className="p-2">
            <label className="pr-8" htmlFor="title">Title</label>
            <input className="border border-solid"
              type="text"
              name="title"
              value={post.title}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="p-2">
            <label className="pr-8" htmlFor="category">Category</label>
            <select className="border border-solid"
              name="category"
              id="category"
              value={post.category}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Choose category</option>
              <option value="Traditional Art">Traditional Art</option>
              <option value="Digital Art">Digital Art</option>
              <option value="Audiovisual">Audiovisual</option>
            </select>
          </div>
          <div className="p-2">
            <label htmlFor="body">Article</label>
            <div className="py-2 px-28">
            <Editor onEditorChange={(content) => setPost({ ...post, body: content })} />
            </div>
          </div>
          <div className="p-2">
            <label className="pr-8" htmlFor="image1">Image 1</label>
            <input className="border border-solid"
              type="text"
              name="image1"
              value={post.image1}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="p-2">
            <label className="pr-8" htmlFor="image2">Image 2</label>
            <input className="border border-solid"
              type="text"
              name="image2"
              value={post.image2}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="p-2">
            <label className="pr-8" htmlFor="image 3">Image 3</label>
            <input className="border border-solid"
              type="text"
              name="image3"
              value={post.image3}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="p-2">
            <label className="pr-8" htmlFor="video">Video</label>
            <input className="border border-solid"
              type="text"
              name="video"
              value={post.video}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button className="m-14 px-2 py-1 border border-solid rounded-lg" type="submit">submit</button>
        </form>
      </main>
    </div>
  );
}
