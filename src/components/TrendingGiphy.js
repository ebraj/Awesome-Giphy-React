import React, { useEffect, useState } from "react";

// Importing the axios
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";

const TrendingGiphy = () => {
  // Creating the loader
  const [isloading, setIsLoading] = useState(false);
  const [datas, setDatas] = useState([]);
  // Populating with the trending giphys
  useEffect(() => {
    const fetchGiphy = async () => {
      setIsLoading(true);
      const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "r4dAgR1xaCizzOLRhF8JHJwjbk6WrWhw",
        },
      });
      setDatas(results.data.data);
      setIsLoading(false);
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

  return (
    <div className="giphy container-1200">
      <Header />
      <div className="giphy__container">{renderedGiphys()}</div>
    </div>
  );
};

export default TrendingGiphy;
