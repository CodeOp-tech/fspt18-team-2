import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image } from '@nextui-org/react';
import { Divider } from '@nextui-org/react';
import { Button } from "@nextui-org/react";
import { BsSearchHeart } from "react-icons/bs";

import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

export default function SearchComponent() {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedTerm, setSearchedTerm] = useState('');
  const [found, setfound] = useState('');
  const [foundImage, setfoundImage ] = useState('');

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
      console.log('API URL:', apiUrl);

      setLoading(true);
      setError(null);

      axios
        .get(apiUrl)
        .then((response) => {
          console.log('Response Data:', response.data);
          if (response.data.message === 'Found it') {
            setfound(response.data.message);
            setApiResponse(response.data);
            setfoundImage(response.data.postInfo[0].Image1);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error:', err);
          setError(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchedTerm]);

  


  return (
    <div>
   
      <div className='items-center gap-4'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter search term"
          value={searchedTerm}
          onChange={handleInputChange}
          />
          
        
        <Button  fontsize="medium"  color="danger" aria-label="Like" shadow="lg" endContent={<BsSearchHeart/>} type="submit">SEARCH</Button>
        </form>
        {foundImage && <Image  src={foundImage} shadow="lg" layout="responsive" isZoomed />} 
        </div>

     
      
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : found ? ( // Check if apiResponse is not null
            <div>
           <div className='flex items-center gap-2'>{apiResponse.message} <IoCheckmarkDoneCircleSharp/></div>   
            
            <ul>
              {apiResponse.postInfo.map((item) => (
                <li key={item.id}>
                   <div>
                  <Divider className="my-4" />
                  <h2>{item.Title}</h2>
                  <Divider className="my-4" />
                  <Image src={item.Image1} alt={item.Title} shadow="lg" layout="responsive" isZoomed />
                   
                    <h3>Category: {item.Category}</h3>
                    
                  <Divider className="my-4" />
                  <p>{item.Body}</p>
                    <Divider className="my-4" />
                    </div>
                </li>
              ))}
              </ul>
              
             
                < div>
            <p>Pagination:</p>
            <p>Page: {apiResponse.pagination.page}</p>
            <p>Limit: {apiResponse.pagination.limit}</p>
                  <p>Total Post Info Count: {apiResponse.pagination.totalPostInfoCount}</p>
                  </div>
          </div>
        ) : null}
      </div>
   
  );
}


/*

{item.Category.map(v => (
        <Compo key={v} value={v} higlight={text} />
      ))}

*/