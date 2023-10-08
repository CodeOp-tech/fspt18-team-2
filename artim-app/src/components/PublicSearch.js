import axios from "axios";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { BsSearchHeart } from "react-icons/bs";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import HighlightText from "./HighlightText";

export default function SearchComponent() {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [found, setfound] = useState("");
  const [foundImage, setfoundImage] = useState("");

  const handleInputChange = (e) => {
    setSearchedTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = () => {
    if (searchedTerm) {
      const apiUrl = `http://localhost:5001/public_search?searched=${searchedTerm}`;
      console.log("API URL:", apiUrl);

      setLoading(true);
      setError(null);

      axios
        .get(apiUrl)
        .then((response) => {
          console.log("Response Data:", response.data);
          if (response.data.message === "Found it") {
            setfound(response.data.message);
            setApiResponse(response.data);
            setfoundImage(response.data.postInfo[0].Image1);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error:", err);
          setError(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchedTerm]);

  return (
    <div className="bg-white h-screen overflow-hidden flex flex-col items-center justify-top font-alegreya-sans">
      <div className=" text-black p-8 text-center font-alegreya-sans">
        <h2 className="mb-8 text-5xl font-bold mx-auto text-pink-500 font-alegreya-sans">
          Explore
        </h2>
        <form onSubmit={handleSubmit} className="mb-4 flex">
          <input
            type="text"
            placeholder="Enter search term"
            value={searchedTerm}
            onChange={handleInputChange}
            className="block w-full rounded-md py-2 px-12 border border-gray-300 focus:border-teal-100 focus:ring focus:ring-teal-200"
          />
          <Button
            fontsize="medium"
            color="yellow"
            aria-label="like"
            shadow="lg"
            endContent={<BsSearchHeart />}
            type="submit"
            className="bg-amber-300 text-white font-extrabold py-4 px-4 rounded-lg hover:bg-teal-500 ml-2"
          >
            Search
          </Button>
        </form>
        {foundImage && (
          <Image src={foundImage} shadow="lg" layout="responsive" isZoomed />
        )}

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error.message}</p>
        ) : found ? (
          <div>
            <div className="flex items-center gap-2 text-teal-400">
              {apiResponse.message} <IoCheckmarkDoneCircleSharp />
            </div>

            <ul>
              {apiResponse.postInfo.map((item) => (
                <li key={item.id}>
                  <div>
                    <Divider className="my-4" />
                    {Array.isArray(item.Title) ? (
                      item.Title.map((v) => (
                        <HighlightText
                          key={v}
                          value={v}
                          highlight={searchedTerm}
                        />
                      ))
                    ) : (
                      <HighlightText
                        key={item.Title}
                        value={item.Title}
                        highlight={searchedTerm}
                      />
                    )}
                    <Divider className="my-4" />
                    <Image
                      src={item.Image1}
                      alt={item.Title}
                      shadow="lg"
                      layout="responsive"
                      isZoomed
                    />
                    {Array.isArray(item.Category) ? (
                      item.Category.map((v) => (
                        <HighlightText
                          key={v}
                          value={v}
                          highlight={searchedTerm}
                        />
                      ))
                    ) : (
                      <HighlightText
                        key={item.Category}
                        value={item.Category}
                        highlight={searchedTerm}
                      />
                    )}
                    <Divider className="my-4" />
                    {Array.isArray(item.Body) ? (
                      item.Body.map((v) => (
                        <HighlightText
                          key={v}
                          value={v}
                          highlight={searchedTerm}
                        />
                      ))
                    ) : (
                      <HighlightText
                        key={item.Body}
                        value={item.Body}
                        highlight={searchedTerm}
                      />
                    )}
                    <Divider className="my-4" />
                  </div>
                </li>
              ))}
            </ul>

            <div>
              <p>Pagination:</p>
              <p>Page: {apiResponse.pagination.page}</p>
              <p>Limit: {apiResponse.pagination.limit}</p>
              <p>
                Total Post Info Count:{" "}
                {apiResponse.pagination.totalPostInfoCount}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
