import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image, Divider, Button } from "@nextui-org/react";
import { BsSearchHeart } from "react-icons/bs";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import Pagination from "./Pagination";
import HighlightText from "./HighlightText";




  const PublicSearch = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [found, setFound] = useState("");
  const [foundImage, setFoundImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleInputChange = (e) => {
    setSearchedTerm(e.target.value); 
  };

    const handleSubmit = (e) => {
     e.preventDefault();
    setCurrentPage(1); // Reset to the first page when a new search is initiated
    fetchData(1);
  };

  const fetchData = (page = totalPages) => {
    if (searchedTerm) {
      const apiUrl = `http://localhost:5001/public_search?searched=${searchedTerm}&page=${page}`;
      console.log("API URL:", apiUrl);

      setLoading(true);
      setError(null);

      axios
        .get(apiUrl)
        .then((response) => {
          console.log("Response Data:", response.data);
          if (response.data.message === "Found it") {
            setFound(response.data.message);
            setApiResponse(response.data);
            setTotalPages(response.data.pagination.totalPages);
            setFoundImage(response.data.postInfo[0].Image1);
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchData(newPage);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [searchedTerm, currentPage]);

  return (
    <div className="bg-white h-screen flex-col items-center justify-top font-alegreya-sans">
      <div className=" text-black p-8 text-center font-alegreya-sans  drop-shadow-md ">
        
      <div>

       


        <h1 className="mb-2 text-5xl font-bold mx-auto text-pink-500 font-alegreya-sans ">
          Explore
        </h1>
        <h3 className="italic mb-12 text-neutral-500">
          posts, categories, artists...
        </h3>
        </div>



        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter search term"
            value={searchedTerm}
            onChange={handleInputChange}
            className=" rounded-lg py-2 px-12 border border-gray-300 focus:border-pink-100 focus:ring focus:ring-pink-200"
          />
          <Button
            fontsize="medium"
            color="amber"
            aria-label="Like"
            shadow="lg"
            endContent={<BsSearchHeart />}
            type="submit"
            className="bg-amber-300 text-white font-extrabold rounded-lg hover:bg-amber-500 ml-2"
          ></Button>
        </form>






        {foundImage && (
        
            <Image src={foundImage} width={100} height={100} shadow="lg" layout="responsive" isZoomed />
        )}




      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : found ? (
        <div className=" text-black p-8 text-center font-alegreya-sans  drop-shadow-md ">
          <div className="flex items-center gap-2">
            {apiResponse.message} <IoCheckmarkDoneCircleSharp />
          </div>

              { /*<Divider className="my-4" />
          <div className="flex gap-6 justify-end">
            <h2>Pagination:</h2>
            <h4>Total Pages: {apiResponse.pagination.page}</h4>
            <h4> Max Posts x Page : {apiResponse.pagination.limit}</h4>
            <h4>Total Posts: {apiResponse.pagination.totalPostInfoCount}</h4>
      </div>*/}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

              
              <div className="flex-col items-center ">
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

              </div>




        </div>
      ) : null}
    </div>
  );
};

export default PublicSearch;



