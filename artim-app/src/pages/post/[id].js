import { useRouter } from 'next/router'
import { useState, useEffect } from "react";

export default function Post(props) {
  const [post, setPost] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter()
  const { id } = router.query;
  //const post = props.post; // No funciona
  //console.log("props -----> ", props)
  //console.log("post -----> ", post)

  //llamada fetch utilizando el ID para obtener los detalles del post si es necesario
  //porque no lo he conseguido pasando props
  useEffect(() => {
    if (id) {
    fetch(`http://localhost:5001/posts/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setPost(json);
      })
      .catch((error) => {
        setError("Woops, something went wrong")
      })
    }
  }, [id]);
  
  return (
    <div>
      <p>Post ID: {id}</p>
      {post.length > 0 ? (
        <>
          <img src={post[0].Image1} alt={post[0].Title} />
          <p>Title: {post[0].Title}</p>
          <p>Category: {post[0].Category}</p>
          <div dangerouslySetInnerHTML={{ __html: post[0].Body }} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
