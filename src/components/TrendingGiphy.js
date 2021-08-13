import React, { useEffect, useState } from "react";

// Importing the axios
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const TrendingGiphy = () => {
  const [datas, setDatas] = useState([]);
  // Populating with the trending giphys
  useEffect(() => {
    const fetchGiphy = async () => {
      const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "r4dAgR1xaCizzOLRhF8JHJwjbk6WrWhw",
        },
      });
      setDatas(results.data.data);
    };
    fetchGiphy();
  }, []);

  //   Creating the GIFS
  const renderedGiphys = () => {
    return datas.map((el) => {
      return (
        <div key={uuidv4()} className="giphy__container-el">
          <img src={el.images.fixed_height.url} />
        </div>
      );
    });
  };

  return (
    <div className="giphy container-1000">
      <h1 className="giphy__title">Awesome Giphy</h1>
      <div className="giphy__container">
        {datas !== [] ? renderedGiphys() : null}
      </div>
    </div>
  );
};

export default TrendingGiphy;
