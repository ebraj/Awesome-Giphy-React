import React, { useEffect, useState } from "react";

// Importing the axios
import axios from "axios";
import Header from "./Header";
import { v4 as uuidv4 } from "uuid";
import { BiSearch } from "react-icons/bi";

const TrendingGiphy = () => {
  // Creating the loader
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [datas, setDatas] = useState([]);
  // Populating with the trending giphys
  useEffect(() => {
    const fetchGiphy = async () => {
      setIsError(false);
      setIsLoading(true);
      // Handling the Error Properly
      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "r4dAgR1xaCizzOLRhF8JHJwjbk6WrWhw",
          },
        });
        setDatas(results.data.data);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        console.log(err);
      }
    };
    fetchGiphy();
  }, []);

  //   Creating the GIFS
  const renderedGiphys = () => {
    if (isloading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
    return datas.map((el) => {
      return (
        <div key={uuidv4()} className="giphy__container-el">
          <img
            src={el.images.fixed_height.url}
            alt={el.images.fixed_height.url}
          />
        </div>
      );
    });
  };
  // Handliing the Search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="giphy container-1200">
      <Header />
      <form className="giphy__form">
        <input
          type="text"
          placeholder="@Search the Giphy"
          className="giphy__form--input"
          onChange={handleSearch}
          value={search}
        />
        <button className="giphy__form--submit">
          <BiSearch />
        </button>
      </form>
      <div className="giphy__container">{renderedGiphys()}</div>
    </div>
  );
};

export default TrendingGiphy;
