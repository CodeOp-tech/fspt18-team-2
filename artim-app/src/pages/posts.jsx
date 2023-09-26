import { useState } from "react";

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
      const response = await fetch("/posts", {
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

      console.log(post);
      if (response.ok) {
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
    <div>
      <main>
        <h1>Posts Creation page</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          Creation Form
          <p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={(e) => handleChange(e)}
            />
          </p>
          <p>
            <label htmlFor="category">category</label>
            <select
              name="category"
              id="category"
              value={post.category}
              onChange={(e) => handleChange(e)}
            >
              category
              <option value="">Choose category</option>
              <option value="Traditional Art">Traditional Art</option>
              <option value="Digital Art">Digital Art</option>
              <option value="Audiovisual">Audiovisual</option>
            </select>

            <input
              type="text"
              name="category"
              value={post.category}
              onChange={(e) => handleChange(e)}
            />
          </p>
          <p>
            <label htmlFor="body">body</label>
            <input
              type="text"
              name="body"
              value={post.body}
              onChange={(e) => handleChange(e)}
            />
          </p>
          <p>
            <label htmlFor="image1">image1</label>
            <input
              type="text"
              name="image1"
              value={post.image1}
              onChange={(e) => handleChange(e)}
            />
          </p>
          <p>
            <label htmlFor="image2">image2</label>
            <input
              type="text"
              name="image2"
              value={post.image2}
              onChange={(e) => handleChange(e)}
            />
          </p>
          <p>
            <label htmlFor="image3">image3</label>
            <input
              type="text"
              name="image3"
              value={post.image3}
              onChange={(e) => handleChange(e)}
            />
          </p>
          <p>
            <label htmlFor="video">video</label>
            <input
              type="text"
              name="video"
              value={post.video}
              onChange={(e) => handleChange(e)}
            />
          </p>
          <button type="submit">submit</button>
        </form>
      </main>
    </div>
  );
}
